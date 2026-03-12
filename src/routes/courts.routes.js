const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const courtController = require('../controllers/court.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', courtController.list);
router.get('/:id', courtController.get);
router.post('/', auth, [ body('name').notEmpty() ], courtController.create);
router.put('/:id', auth, courtController.update);
router.delete('/:id', auth, courtController.remove);

module.exports = router;
