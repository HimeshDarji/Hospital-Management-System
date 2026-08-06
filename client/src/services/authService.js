import api, { clearAccessToken, setAccessToken } from './api'

const setSession = ({ accessToken, user }) => { setAccessToken(accessToken); return user }
let sessionRefreshRequest = null
export const register = async (payload) => setSession((await api.post('/auth/register', payload, { headers: { 'Content-Type': 'multipart/form-data' } })).data)
export const login = async (payload) => setSession((await api.post('/auth/login', payload)).data)
export const refreshSession = async () => {
  sessionRefreshRequest ||= api.post('/auth/refresh').then(({ data }) => setSession(data)).finally(() => { sessionRefreshRequest = null })
  return sessionRefreshRequest
}
export const logout = async () => { try { await api.post('/auth/logout') } finally { clearAccessToken() } }
export const requestPasswordReset = async (email) => (await api.post('/auth/forgot-password', { email })).data
export const resetPassword = async (token, password) => setSession((await api.post(`/auth/reset-password/${token}`, { password })).data)
export const verifyEmail = async (token) => (await api.get(`/auth/verify-email/${token}`)).data
export const resendVerification = async () => (await api.post('/auth/resend-verification')).data
