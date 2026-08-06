const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 }, email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 }, topic: { type: String, required: true, enum: ['Request a demo', 'Product question', 'Partnership'] }, message: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 }, status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' } }, { timestamps: true });
contactSchema.index({ status: 1, createdAt: -1 });
module.exports = mongoose.model('Contact', contactSchema);
