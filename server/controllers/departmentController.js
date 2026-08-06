const Department = require('../models/Department'); const { createResourceController } = require('../utils/resourceController');
module.exports = createResourceController(Department, { searchFields: ['name', 'code'], populate: 'headDoctor' });
