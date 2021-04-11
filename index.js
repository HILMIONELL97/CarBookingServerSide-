const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require("passport");


//Import Routes
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/carRoute');
const bookingRoutes = require('./routes/reserveRoute');


//Config App
require('dotenv').config();
require('./config/db');
const app = express();

//Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(expressValidator())
if (process.env.NODE_ENV === 'developpement') app.use(morgan());

//Routes Middleware
app.use('/api', authRoutes);
app.use('/api/car', carRoutes);
app.use('/api/booking', bookingRoutes);

// Passport Middleware
app.use(passport.initialize());
require("./config/passport")(passport);








const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is running on port ${port}`));