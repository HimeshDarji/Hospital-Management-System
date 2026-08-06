import { useEffect, useState } from 'react'
import { FiCheckCircle, FiMail, FiXCircle } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { verifyEmail } from '../../services/authService'
import { AuthShell } from '../Login'
import { LoadingSpinner } from '../../components/UI'

function VerifyEmail() {
  const { token } = useParams(); const [state, setState] = useState('loading'); const [message, setMessage] = useState('Verifying your email address securely.')
  useEffect(() => { verifyEmail(token).then((data) => { setState('success'); setMessage(data.message) }).catch((error) => { setState('error'); setMessage(error.response?.data?.message || 'We could not verify this email link.') }) }, [token])
  return <AuthShell title="Email verification" subtitle="A secure MediSphere account begins with a verified email."><div className={`verification-state ${state}`}>{state === 'loading' ? <LoadingSpinner /> : state === 'success' ? <FiCheckCircle /> : <FiXCircle />}<h3>{state === 'loading' ? 'Verifying your email' : state === 'success' ? 'Email verified' : 'Verification unavailable'}</h3><p>{message}</p>{state !== 'loading' && <Link className="button" to="/login"><FiMail /> Go to sign in</Link>}</div></AuthShell>
}
export default VerifyEmail
