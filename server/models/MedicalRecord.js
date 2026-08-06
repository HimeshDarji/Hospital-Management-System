const mongoose = require('mongoose');
const attachmentSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, url: { type: String, required: true }, mimeType: String }, { _id: false });
const vitalSchema = new mongoose.Schema({ bloodPressure: String, heartRate: Number, temperature: Number, weight: Number, height: Number, recordedAt: { type: Date, default: Date.now } }, { _id: false });
const medicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', default: null },
  diagnosis: { type: String, required: true, trim: true, maxlength: 500 },
  treatment: { type: String, trim: true, maxlength: 2000 },
  allergies: [{ type: String, trim: true }], vitals: vitalSchema, attachments: [attachmentSchema], notes: { type: String, trim: true, maxlength: 4000 },
}, { timestamps: true });
medicalRecordSchema.index({ patient: 1, createdAt: -1 });
module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
