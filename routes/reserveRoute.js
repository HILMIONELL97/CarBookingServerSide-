const express = require('express');
const router = express.Router();
const BookingsController = require('../controllers/clientController');




router.post('/addBooking', BookingsController.create_booking);

router.get('/', BookingsController.get_all_cars);




module.exports = router;