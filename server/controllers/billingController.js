const Billing = require('../models/Billing'); const { createResourceController } = require('../utils/resourceController');
module.exports = createResourceController(Billing, { searchFields: ['invoiceNumber'], populate: 'patient appointment', beforeCreate: (body) => ({ ...body, invoiceNumber: body.invoiceNumber || `INV-${Date.now()}` }) });
