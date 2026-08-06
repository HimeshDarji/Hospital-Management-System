const Patient = require('../models/Patient'); const { createResourceController } = require('../utils/resourceController');
module.exports = createResourceController(Patient, { searchFields: ['name', 'email', 'phone', 'patientId'], beforeCreate: (body) => ({ ...body, patientId: body.patientId || `PAT-${Date.now()}` }) });
