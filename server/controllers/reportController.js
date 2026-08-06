const Report = require('../models/Report'); const { createResourceController } = require('../utils/resourceController');
module.exports = createResourceController(Report, { searchFields: ['title', 'type'], defaultSort: '-createdAt', beforeCreate: (body, req) => ({ ...body, generatedBy: req.user._id }) });
