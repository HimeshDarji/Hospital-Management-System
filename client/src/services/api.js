import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://hospital-management-system-yhr3.onrender.com/api/v1', withCredentials: true })
let accessToken = null
let refreshRequest = null
const authEndpoints = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/forgot-password', '/auth/reset-password']

export const setAccessToken = (token) => { accessToken = token || null }
export const clearAccessToken = () => { accessToken = null }

api.interceptors.request.use((config) => {
  if (accessToken && !config.headers.Authorization) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

api.interceptors.response.use((response) => response, async (error) => {
  const original = error.config
  const isAuthEndpoint = authEndpoints.some((path) => original?.url?.startsWith(path))
  if (error.response?.status !== 401 || !original || original._retry || isAuthEndpoint) return Promise.reject(error)
  original._retry = true
  try {
    refreshRequest ||= api.post('/auth/refresh', undefined, { headers: { Authorization: undefined } })
      .then(({ data }) => { setAccessToken(data.accessToken); return data.accessToken })
      .finally(() => { refreshRequest = null })
    const token = await refreshRequest
    original.headers = original.headers || {}
    original.headers.Authorization = `Bearer ${token}`
    return api(original)
  } catch (refreshError) {
    clearAccessToken()
    return Promise.reject(refreshError)
  }
})

export default api
