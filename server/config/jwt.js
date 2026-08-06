const jwt = require('jsonwebtoken');

const required = (name) => {
  if (!process.env[name]) throw new Error(`${name} is not configured.`);
  return process.env[name];
};

const signAccessToken = (payload) => jwt.sign(payload, required('JWT_ACCESS_SECRET'), { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' });
const signRefreshToken = (payload) => jwt.sign(payload, required('JWT_REFRESH_SECRET'), { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });
const verifyAccessToken = (token) => jwt.verify(token, required('JWT_ACCESS_SECRET'));
const verifyRefreshToken = (token) => jwt.verify(token, required('JWT_REFRESH_SECRET'));

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
