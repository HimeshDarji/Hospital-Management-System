const router = require('express').Router(); const { body } = require('express-validator'); const controller = require('../controllers/contactController'); const { validate } = require('../middleware/validationMiddleware');
router.post('/', [body('name').trim().isLength({ min: 2, max: 80 }), body('email').isEmail().normalizeEmail(), body('topic').isIn(['Request a demo', 'Product question', 'Partnership']), body('message').trim().isLength({ min: 10, max: 2000 })], validate, controller.create);
module.exports = router;
