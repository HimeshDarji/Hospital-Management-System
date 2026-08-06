const Doctor = require('../models/Doctor'); const { createResourceController } = require('../utils/resourceController');
module.exports = createResourceController(Doctor, { searchFields: ['name', 'email', 'doctorId', 'specialization'], populate: 'department', beforeCreate: (body) => ({ ...body, doctorId: body.doctorId || `DOC-${Date.now()}` }) });
