import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FiArrowRight, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { AuthShell, Field } from '../Login'
import { requestPasswordReset } from '../../services/authService'
import { apiErrorMessage } from '../../utils/helpers'
import { LoadingSpinner } from '../../components/UI'

const schema = yup.object({ email: yup.string().email('Enter a valid email address.').required('Email is required.') })
function ForgotPassword() { const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) }); const onSubmit = async ({ email }) => { try { const data = await requestPasswordReset(email); toast.success(data.message) } catch (error) { toast.error(apiErrorMessage(error)) } }; return <AuthShell title="Reset your password" subtitle="Enter your email and we’ll send a secure reset link."><form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate><Field label="Email address" error={errors.email?.message}><span className="field-icon"><FiMail /></span><input type="email" placeholder="you@hospital.com" autoComplete="email" {...register('email')} /></Field><button className="button auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? <LoadingSpinner /> : <>Send reset link <FiArrowRight /></>}</button></form><p className="auth-switch"><Link to="/login">← Back to sign in</Link></p></AuthShell> }
export default ForgotPassword
