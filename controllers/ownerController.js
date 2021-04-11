const Car = require('../models/car.model')
const User = require('../models/user.model')
const Booking = require('../models/reserve_car.model')
const _ = require('lodash');
const formidable = require('formidable')
const fs = require('fs');
const Place = require('../models/place.model');
const mongoose = require('mongoose')
const Fawn = require('fawn')
const OwnerCar = require('../models/owner_car.model')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const carFields = '_id registration_number name mark color price fuel is_saled photo id_place'
const userFields = '_id first_name last_name email password cin phone role';
const bookingFields = '_id  id_owner id_client id_car proposed_reduction is_booked';





exports.create_car = (req, res, Owner) => {

    var token = req.headers['authorization'].replace(/^Bearer\s/, '');

    if (!token)

        return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, keys.secretOrKey, function(err, decoded) {

        if (err)

            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


        if (decoded.role !== 'Owner') {
            return res.status(500).json({ message: `Unable to perform action, you have to be Owner member!` });
        } else {

            Fawn.init(mongoose)

            let form = new formidable.IncomingForm();

            form.keepExtensions = true;

            form.parse(req, (err, fields, files) => {

                if (err) {
                    return res.status(400).json({
                        error: 'Image could not uploaded !'
                    })
                }

                let car = new Car(fields);
                if (files.photo) {

                    if (files.photo.size > Math.pow(10, 6)) {
                        return res.status(400).json({
                            error: 'Image should be less than 1mb in size !'
                        })
                    }

                    car.photo.data = fs.readFileSync(files.photo.path)
                    car.photo.contentType = files.photo.type
                }
                const placeDispo = Place.findOne({ is_free: true });
                let createOwnerCar = new OwnerCar({
                    id_owner: Owner._id,
                    id_place: placeDispo._id,
                    id_car: car._id,
                });
                console.log(createOwnerCar)
                const task = Fawn.Task();

                if (placeDispo) {
                    const CCCOCUP = task
                        .save('car', car)
                        .save('ownercar', createOwnerCar)
                        .update(
                            'place', { _id: placeDispo._id }, {
                                $set: {
                                    is_free: false,
                                },
                            }
                        )
                        .run({ useMongoose: true });
                    if (CCCOCUP)
                        return res.json(CCCOCUP);
                }
            })
        }

    })
}


exports.update_car = (req, res) => {

    var token = req.headers['authorization'].replace(/^Bearer\s/, '');

    if (!token)

        return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, keys.secretOrKey, function(err, decoded) {

        if (err)

            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


        if (decoded.role !== 'Owner') {
            return res.status(500).json({ message: `Unable to perform action, you have to be Owner member!` });
        } else {
            let form = new formidable.IncomingForm();

            form.keepExtensions = true;

            form.parse(req, (err, fields, files) => {

                if (err) {
                    return res.status(400).json({
                        error: 'Image could not uploaded !'
                    })
                }


                let car = req.CCCOCUP;
                console.log(CCCOCUP)

                car = _.extend(car, fields)


                if (files.photo) {

                    if (files.photo.size > Math.pow(10, 6)) {
                        return res.status(400).json({
                            error: 'Image should be less than 1mb in size !'
                        })
                    }

                    car.photo.data = fs.readFileSync(files.photo.path)
                    car.photo.contentType = files.photo.type
                }

                car.save((err, car) => {

                    if (err) {
                        return res.status(400).json({
                            err: 'car not updated '
                        })
                    }

                    res.json({
                        car
                    })
                })

            })
        }
    })
}


exports.delete_car = (req, res) => {
    var token = req.headers['authorization'].replace(/^Bearer\s/, '');

    if (!token)
        return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, keys.secretOrKey, function(err, decoded) {
        if (err)

            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        if (decoded.role !== 'Owner') {
            return res.status(500).json({ message: `Unable to perform action, you have to be Owner member!` });
        } else {

            const id = req.params.carId;

            // find and delete a car by id
            Car.findOneAndDelete({ _id: id })
                .select(carFields)
                .exec()
                .then(car => {
                    // return success message in response
                    const response = {
                        message: `Deleted car of id '${car._id}' successfully`
                    }
                    res.status(200).json({ response });
                })
                .catch(error => {

                    res.status(500).json({ message: `Unable to DELETE car of id '${id}'`, error: error });
                });
        }
    });
}

exports.placeFree = (req, res) => {

    const place = new Place(req.body);


    place.save((err, place) => {

        if (err) {
            return res.status(400).json({
                error: 'bad Request !'
            })
        }

        res.json({
            place: place
        })
    })

}

// exports.createOwnerCar = () => {

//     const placeDispo = Place.findOne({ is_free: true });
//     let createOwnerCar = new OwnerCar({
//         id_owner: Owner._id,
//         id_place: placeDispo._id,
//         id_car: newCar._id,
//     });
//     createOwnerCar
//     .updateOne()
//     .save((err, ownerCar) => {
//         if (err) {
//             return res.status(400).json({
//                 err: 'OwnerCar not persist!! '
//             })
//         }

//         res.json({
//             ownerCar
//         })
//     })
// }

exports.get_all_clients = (req, res) => {

    var token = req.headers['authorization'].replace(/^Bearer\s/, '');

    if (!token)

        return res.status(401).send({ auth: false, message: 'No token provided.' });


    jwt.verify(token, keys.secretOrKey, function(err, decoded) {
        if (err)

            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


        if (decoded.role !== 'Owner') {
            return res.status(500).json({ message: `Unable to perform action, you have to be Owner member!` });
        } else {
            // get all clients from database
            User.find({ role: "User" })
                .select(userFields)
                .exec()
                .then(clients => {

                    const response = {
                        clients: clients.map(client => {
                            return {
                                id: client._id,
                                first_name: client.first_name,
                                last_name: client.last_name,
                                email: client.email
                            }
                        })
                    }
                    res.status(200).json(response);
                })
                .catch(error => {

                    res.status(500).json({ message: `Unable to GET all clients!`, error: error });
                });
        }
    });
}

exports.get_all_bookings = (req, res) => {

    var token = req.headers['authorization'].replace(/^Bearer\s/, '');

    if (!token)

        return res.status(401).send({ auth: false, message: 'No token provided.' });


    jwt.verify(token, keys.secretOrKey, function(err, decoded) {
        if (err)

            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


        if (decoded.role !== 'Owner') {
            return res.status(500).json({ message: `Unable to perform action, you have to be Owner member!` });
        } else {
            // get all bookings from database
            Booking.find()
                .select(bookingFields)
                .exec()
                .then(bookings => {

                    const response = {
                        bookings: bookings.map(booking => {
                            return {
                                id: booking._id,
                                id_owner: booking.id_owner,
                                id_client: booking.id_client,
                                id_car: booking.id_car,
                                proposed_reduction: booking.proposed_reduction,
                                is_booked: booking.is_booked
                            }
                        })
                    }
                    res.status(200).json(response);
                })
                .catch(error => {

                    res.status(500).json({ message: `Unable to GET all bookings`, error: error });
                });
        }
    });
}