const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const keys = require("../config/keys");



exports.create_user = (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {

            return res.status(400).json({ message: "Email already exists" });
        } else {
            // create a user object
            const user = new User({

                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                cin: req.body.cin,
                phone: req.body.phone,
                role: req.body.role
            });
            // generate salt 
            bcrypt.genSalt(10, (err, salt) => {
                // hash user's password
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err)

                        return res.status(500).json({ message: err.message });
                    user.password = hash;

                    user.save().then(user => {

                        const response = {
                            message: `Created user successfully`,
                            user: user
                        }
                        return res.status(201).json({ response });
                    }).catch(error => {

                        return res.status(500).json({ message: `Unable to get CREATE user `, error: error });
                    });
                });
            });
        }
    });
}


exports.login_user = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // check if user exists by email
    User.findOne({ email }).then(user => {
        if (!user) {

            return res.status(404).json({ message: "Email not found" });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // generate JWT 
                const payload = {
                    id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey, {
                        expiresIn: 1000000
                    },
                    (err, token) => {
                        res.json({
                            id: user._id,
                            token
                        });
                    }
                );
            } else {
                // return error if password doesn't match
                return res.status(400).json({ message: "Password incorrect" });
            }
        });
    });
}