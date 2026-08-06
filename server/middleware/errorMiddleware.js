const notFound = (req, res) => res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === 'MulterError') return res.status(400).json({ success: false, message: error.code === 'LIMIT_FILE_SIZE' ? 'Profile image must be smaller than 3 MB.' : error.message });
  if (error.name === 'ValidationError') return res.status(422).json({ success: false, message: 'Validation failed.', errors: Object.values(error.errors).map(({ path, message }) => ({ field: path, message })) });
  if (error.code === 11000) return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  return res.status(error.statusCode || 500).json({ success: false, message: error.statusCode ? error.message : 'An unexpected server error occurred.' });
};
module.exports = { notFound, errorHandler };
