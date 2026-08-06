import { useCallback, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService'
import { AuthContext } from './authStore'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    authService.refreshSession().then((nextUser) => { if (mounted) setUser(nextUser) }).catch(() => { if (mounted) setUser(null) }).finally(() => { if (mounted) setIsLoading(false) })
    return () => { mounted = false }
  }, [])

const login = useCallback(async (values) => { const nextUser = await authService.login(values); setUser(nextUser); return nextUser }, [])
  const register = useCallback(async (values) => { const nextUser = await authService.register(values); setUser(nextUser); return nextUser }, [])
  const logout = useCallback(async () => { await authService.logout(); setUser(null) }, [])
  const updateUser = useCallback((nextUser) => setUser(nextUser), [])
  const value = useMemo(() => ({ user, isLoading, isAuthenticated: Boolean(user), login, register, logout, updateUser }), [user, isLoading, login, register, logout, updateUser])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
