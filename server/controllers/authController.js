const User = require('../models/User');
const { verifyRefreshToken } = require('../config/jwt');
const { clearRefreshCookie, createTokenPair, hashToken, refreshTokenExpiry, setRefreshCookie } = require('../services/authService');
const { sendPasswordResetEmail, sendVerificationEmail } = require('../services/mailService');

const respondWithAuth = async (user, res, statusCode = 200, persistentSession = true) => {
  const { accessToken, refreshToken } = createTokenPair(user);
  user.refreshTokens = user.refreshTokens.filter(({ expiresAt }) => expiresAt > new Date()).slice(-4);
  user.refreshTokens.push({ token: hashToken(refreshToken), expiresAt: refreshTokenExpiry() });
  await user.save({ validateBeforeSave: false });
  setRefreshCookie(res, refreshToken, persistentSession);
  return res.status(statusCode).json({ success: true, accessToken, user: user.toSafeObject() });
};

const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });
    if (existingUser) return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    const user = await User.create({ ...req.body, profileImage: req.file ? `/uploads/profiles/${req.file.filename}` : null });
    const verificationToken = user.createToken('verificationToken', 'verificationTokenExpires', 24 * 60 * 60 * 1000);
    await user.save({ validateBeforeSave: false });
    // await sendVerificationEmail(user, verificationToken);
    return respondWithAuth(user, res, 201);
  } catch (error) { return next(error); }
};

const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password +refreshTokens');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    if (role && user.role !== role) return res.status(403).json({ success: false, message: 'This account does not have the selected role.' });
    return respondWithAuth(user, res, 200, Boolean(req.body.remember));
  } catch (error) { return next(error); }
};

const refresh = async (req, res, next) => {
  try {
    const rawToken =
      req.cookies?.refreshToken ||
      req.body?.refreshToken;
    if (!rawToken) return res.status(401).json({ success: false, message: 'Refresh token is required.' });
    const payload = verifyRefreshToken(rawToken);
    const user = await User.findById(payload.sub).select('+refreshTokens');
    const hashed = hashToken(rawToken);
    if (!user || !user.refreshTokens.some((entry) => entry.token === hashed && entry.expiresAt > new Date())) return res.status(401).json({ success: false, message: 'Refresh token is invalid or expired.' });
    user.refreshTokens = user.refreshTokens.filter((entry) => entry.token !== hashed && entry.expiresAt > new Date());
    return respondWithAuth(user, res);
  } catch (error) { clearRefreshCookie(res); return next(error); }
};

const logout = async (req, res, next) => {
  try {
    const rawToken = req.cookies?.refreshToken;
    if (rawToken) {
      const payload = verifyRefreshToken(rawToken);
      await User.updateOne({ _id: payload.sub }, { $pull: { refreshTokens: { token: hashToken(rawToken) } } });
    }
    clearRefreshCookie(res);
    return res.json({ success: true, message: 'Logged out successfully.' });
  } catch (error) { clearRefreshCookie(res); return res.json({ success: true, message: 'Logged out successfully.' }); }
};

const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() }).select('+passwordResetToken +passwordResetExpires');
    if (user) {
      const resetToken = user.createToken('passwordResetToken', 'passwordResetExpires', 15 * 60 * 1000);
      await user.save({ validateBeforeSave: false });
      await sendPasswordResetEmail(user, resetToken);
    }
    return res.json({ success: true, message: 'If an account exists for this email, a reset link has been sent.' });
  } catch (error) { return next(error); }
};

const resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ passwordResetToken: hashToken(req.params.token), passwordResetExpires: { $gt: new Date() } }).select('+password +passwordResetToken +passwordResetExpires +refreshTokens');
    if (!user) return res.status(400).json({ success: false, message: 'This reset link is invalid or has expired.' });
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens = [];
    await user.save();
    return respondWithAuth(user, res);
  } catch (error) { return next(error); }
};

const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ verificationToken: hashToken(req.params.token), verificationTokenExpires: { $gt: new Date() } }).select('+verificationToken +verificationTokenExpires');
    if (!user) return res.status(400).json({ success: false, message: 'This verification link is invalid or has expired.' });
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return res.json({ success: true, message: 'Email verified successfully.' });
  } catch (error) { return next(error); }
};

const resendVerification = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+verificationToken +verificationTokenExpires');
    if (user.isVerified) return res.json({ success: true, message: 'Your email is already verified.' });
    const token = user.createToken('verificationToken', 'verificationTokenExpires', 24 * 60 * 60 * 1000);
    await user.save({ validateBeforeSave: false });
    await sendVerificationEmail(user, token);
    return res.json({ success: true, message: 'Verification email sent.' });
  } catch (error) { return next(error); }
};

const getCurrentUser = (req, res) => res.json({ success: true, user: req.user.toSafeObject() });

module.exports = { register, login, refresh, logout, forgotPassword, resetPassword, verifyEmail, resendVerification, getCurrentUser };
