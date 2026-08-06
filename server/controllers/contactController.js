const Contact = require('../models/Contact');
const create = async (req, res, next) => { try { const contact = await Contact.create(req.body); return res.status(201).json({ success: true, message: 'Thank you. Our team will be in touch shortly.', data: contact }); } catch (error) { return next(error); } };
module.exports = { create };
