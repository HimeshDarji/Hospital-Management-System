const Laboratory = require('../models/Laboratory'); const { createResourceController } = require('../utils/resourceController');
module.exports = createResourceController(Laboratory, { searchFields: ['reportNumber', 'testName'], populate: 'patient doctor', beforeCreate: (body) => ({ ...body, reportNumber: body.reportNumber || `LAB-${Date.now()}` }) });
