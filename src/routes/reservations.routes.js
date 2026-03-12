const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, reservationController.list); // protected so user can view their reservations
router.get('/:id', auth, reservationController.get);
router.post('/', auth, [ body('court').notEmpty(), body('startTime').notEmpty(), body('endTime').notEmpty() ], reservationController.create);
router.put('/:id', auth, reservationController.update);
router.delete('/:id', auth, reservationController.remove);

module.exports = router;
