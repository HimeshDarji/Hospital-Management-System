const { validationResult } = require('express-validator');
const validate = (req, res, next) => { const errors = validationResult(req); return errors.isEmpty() ? next() : res.status(422).json({ success: false, message: 'Please correct the highlighted fields.', errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg })) }); };
module.exports = { validate };
