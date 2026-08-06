const Inventory = require('../models/Inventory'); const { createResourceController } = require('../utils/resourceController');
module.exports = createResourceController(Inventory, { searchFields: ['name', 'itemCode', 'supplier'] });
