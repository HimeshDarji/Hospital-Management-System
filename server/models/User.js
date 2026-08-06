const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: ['admin', 'doctor', 'receptionist', 'patient'], default: 'patient' },
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'], required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true, trim: true, maxlength: 300 },
  profileImage: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, select: false },
  verificationTokenExpires: { type: Date, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  refreshTokens: [{ token: { type: String, select: false }, expiresAt: Date }],
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidate) { return bcrypt.compare(candidate, this.password); };
userSchema.methods.createToken = function createToken(field, expiryField, duration) {
  const rawToken = crypto.randomBytes(32).toString('hex');
  this[field] = crypto.createHash('sha256').update(rawToken).digest('hex');
  this[expiryField] = new Date(Date.now() + duration);
  return rawToken;
};
userSchema.methods.toSafeObject = function toSafeObject() {
  const { password, refreshTokens, verificationToken, verificationTokenExpires, passwordResetToken, passwordResetExpires, ...safeUser } = this.toObject();
  return safeUser;
};

module.exports = mongoose.model('User', userSchema);
