const express = require('express');
const router = express.Router();
const CarController = require('../controllers/ownerController');
const { carValidator } = require('../middlewares/carValidation')


router.post('/add_car', carValidator, CarController.create_car);

router.delete('/:carId/', CarController.delete_car);

router.patch('/:carId/', CarController.update_car);

router.get('/clients', CarController.get_all_clients)

router.get('/Booking/all', CarController.get_all_bookings)






router.post('/createPlace', CarController.placeFree)

module.exports = router;