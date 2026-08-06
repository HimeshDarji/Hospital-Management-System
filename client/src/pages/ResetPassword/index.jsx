import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { AuthShell, Field } from '../Login'
import { resetPassword } from '../../services/authService'
import { apiErrorMessage, roleDashboardPath } from '../../utils/helpers'
import { LoadingSpinner } from '../../components/UI'

const schema = yup.object({ password: yup.string().min(8, 'Use at least 8 characters.').matches(/[A-Z]/, 'Include an uppercase letter.').matches(/[a-z]/, 'Include a lowercase letter.').matches(/\d/, 'Include a number.').required('Password is required.'), confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match.').required('Please confirm your password.') })
function ResetPassword() { const [show, setShow] = useState(false); const { token } = useParams(); const navigate = useNavigate(); const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) }); const onSubmit = async ({ password }) => { try { const user = await resetPassword(token, password); toast.success('Your password has been reset.'); navigate(roleDashboardPath(user.role), { replace: true }) } catch (error) { toast.error(apiErrorMessage(error, 'Unable to reset your password.')) } }; return <AuthShell title="Choose a new password" subtitle="Use a strong password you haven’t used before."><form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate><Field label="New password" error={errors.password?.message}><input type={show ? 'text' : 'password'} placeholder="Create a strong password" autoComplete="new-password" {...register('password')} /><button className="password-toggle" type="button" onClick={() => setShow(!show)}>{show ? <FiEyeOff /> : <FiEye />}</button></Field><Field label="Confirm password" error={errors.confirmPassword?.message}><input type={show ? 'text' : 'password'} placeholder="Repeat password" autoComplete="new-password" {...register('confirmPassword')} /></Field><button className="button auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? <LoadingSpinner /> : <>Reset password <FiArrowRight /></>}</button></form></AuthShell> }
export default ResetPassword
