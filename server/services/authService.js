const crypto = require('crypto');
const { signAccessToken, signRefreshToken } = require('../config/jwt');

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
const createTokenPair = (user) => {
  const payload = { sub: user._id.toString(), role: user.role };
  return { accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) };
};
const refreshTokenExpiry = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
const cookieOptions = (persistent = true) => ({ httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', ...(persistent ? { maxAge: 7 * 24 * 60 * 60 * 1000 } : {}) });
const setRefreshCookie = (res, token, persistent) => res.cookie('refreshToken', token, cookieOptions(persistent));
const clearRefreshCookie = (res) => res.clearCookie('refreshToken', cookieOptions());

module.exports = { hashToken, createTokenPair, refreshTokenExpiry, cookieOptions, setRefreshCookie, clearRefreshCookie };
