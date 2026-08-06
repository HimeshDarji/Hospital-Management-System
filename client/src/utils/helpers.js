export const roleDashboardPath = (role) => ({ admin: '/admin/dashboard', doctor: '/doctor/dashboard', receptionist: '/receptionist/dashboard', patient: '/patient/dashboard' }[role] || '/')

export const apiErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => error.response?.data?.message || fallback
