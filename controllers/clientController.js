const ReserveCar = require('../models/reserve_car.model');
const Car = require('../models/car.model')





exports.create_booking = (req, res) => {


    Car.findById(req.body.car)

    // create new booking 
    const Reserve = new ReserveCar({

        id_owner: req.body.id_owner,
        id_client: req.body.id_client,
        id_car: req.body.id_car,
        proposed_reduction: req.body.proposed_reduction,
        is_booked: req.body.is_booked
    });
    // save booking and return in response
    Reserve.save((err, Reserve) => {
        if (err) {
            return res.status(500).json({ message: `Unable to get CREATE booking`, error: err })
        }

        const Booking = {
            message: `Created booking of id '${Reserve._id}' successfully`,
            Reserve: Reserve
        }
        return res.status(201).json({ Booking });
    })


};



exports.get_all_cars = (req, res) => {

    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let order = req.query.order ? req.query.order : 'asc';
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Car.find()
        .select("-photo")
        .sort([
            [sortBy, order]
        ])
        .limit(limit)
        .exec((err, cars) => {

            if (err) {
                return res.status(404).json({
                    error: "cars not found !"
                })
            }

            res.json({
                cars
            })
        })

}