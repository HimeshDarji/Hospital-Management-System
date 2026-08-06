const mongoose = require('mongoose');
const medicineSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, dosage: { type: String, required: true, trim: true }, frequency: { type: String, required: true, trim: true }, duration: { type: String, required: true, trim: true }, instructions: { type: String, trim: true, maxlength: 600 } }, { _id: false });
const prescriptionSchema = new mongoose.Schema({
  prescriptionNumber: { type: String, required: true, unique: true, index: true }, patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true }, doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true }, appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', default: null }, diagnosis: { type: String, trim: true, maxlength: 500 }, medicines: { type: [medicineSchema], validate: [(value) => value.length > 0, 'At least one medicine is required.'] }, notes: { type: String, trim: true, maxlength: 2000 }, status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
}, { timestamps: true });
prescriptionSchema.index({ patient: 1, createdAt: -1 });
module.exports = mongoose.model('Prescription', prescriptionSchema);
