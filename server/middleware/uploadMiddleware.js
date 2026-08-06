const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads', 'profiles'),
  filename: (req, file, callback) => callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`),
});
const upload = multer({ storage, limits: { fileSize: 3 * 1024 * 1024 }, fileFilter: (req, file, callback) => {
  if (/^image\/(jpeg|png|webp)$/.test(file.mimetype)) return callback(null, true);
  const error = new Error('Profile image must be a JPG, PNG, or WEBP file.');
  error.statusCode = 400;
  return callback(error);
} });
module.exports = { upload };
