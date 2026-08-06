const User = require('../models/User');
const { verifyAccessToken } = require('../config/jwt');

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Authentication is required.' });
    const payload = verifyAccessToken(authorization.slice(7));
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ success: false, message: 'This account no longer exists.' });
    req.user = user;
    return next();
  } catch (error) { return res.status(401).json({ success: false, message: 'Your session is invalid or has expired.' }); }
};

module.exports = { authenticate };
