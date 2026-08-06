import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import useAuth from '../../hooks/useAuth'
import { apiErrorMessage, roleDashboardPath } from '../../utils/helpers'
import { LoadingSpinner } from '../../components/UI'

const schema = yup.object({ email: yup.string().email('Enter a valid email address.').required('Email is required.'), password: yup.string().required('Password is required.'), role: yup.string().oneOf(['admin', 'doctor', 'receptionist', 'patient']).required('Select your role.'), remember: yup.boolean() })

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema), defaultValues: { role: 'patient', remember: false } })
  const onSubmit = async (values) => { try { const user = await login(values); toast.success(`Welcome back, ${user.name.split(' ')[0]}.`); navigate(location.state?.from?.pathname || roleDashboardPath(user.role), { replace: true }) } catch (error) { toast.error(apiErrorMessage(error, 'Unable to sign in.')) } }
  return <AuthShell title="Welcome back" subtitle="Sign in to your secure MediSphere workspace."><form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate><Field label="Email address" error={errors.email?.message}><span className="field-icon"><FiMail /></span><input type="email" placeholder="you@hospital.com" autoComplete="email" {...register('email')} /></Field><Field label="Password" error={errors.password?.message}><span className="field-icon"><FiLock /></span><input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" autoComplete="current-password" {...register('password')} /><button className="password-toggle" type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEyeOff /> : <FiEye />}</button></Field><label className="role-field">Sign in as<select {...register('role')}><option value="patient">Patient</option><option value="doctor">Doctor</option><option value="receptionist">Receptionist</option><option value="admin">Administrator</option></select></label><div className="auth-options"><label className="check-label"><input type="checkbox" {...register('remember')} /> <span>Remember me</span></label><Link to="/forgot-password">Forgot password?</Link></div><button className="button auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? <LoadingSpinner label="Signing in" /> : <>Sign in securely <FiArrowRight /></>}</button></form><p className="auth-switch">New to MediSphere? <Link to="/register">Create an account</Link></p></AuthShell>
}

export function AuthShell({ title, subtitle, children }) { return <main className="auth-page"><div className="auth-backdrop auth-backdrop-a" /><div className="auth-backdrop auth-backdrop-b" /><Link className="auth-brand" to="/"><span className="brand-mark"><span /></span><span>Medi<span>Sphere</span></span></Link><section className="auth-wrap"><motion.div className="auth-card" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}><div className="auth-card-top"><span className="auth-shield"><FiLock /></span><h1>{title}</h1><p>{subtitle}</p></div>{children}</motion.div><p className="auth-copyright">© {new Date().getFullYear()} MediSphere · Secure healthcare, thoughtfully connected.</p></section><aside className="auth-aside"><p className="section-kicker">CONNECTED CARE</p><h2>Care teams deserve a calmer way to work.</h2><p>One secure workspace for the people, decisions and moments that matter most.</p><div className="aside-quote"><span>“</span><p>Technology with a human heartbeat.</p></div></aside></main> }
function Field({ label, error, children }) { return <label className={`auth-field ${error ? 'has-error' : ''}`}><span>{label}</span><div className="input-wrap">{children}</div>{error && <small>{error}</small>}</label> }
export { Field }
export default Login
