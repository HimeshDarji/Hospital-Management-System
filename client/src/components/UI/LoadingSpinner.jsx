function LoadingSpinner({ label = 'Loading' }) {
  return <div className="loading-spinner" role="status" aria-label={label}><span /><span /><span /></div>
}

export default LoadingSpinner
