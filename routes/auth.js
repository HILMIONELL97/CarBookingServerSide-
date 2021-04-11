const express = require('express');
const userController = require('../controllers/authController')
const { userSignUpValidator } = require('../middlewares/userValidator')

const router = express.Router();


router.post('/signup', userSignUpValidator, userController.create_user)
router.post('/signin', userController.login_user)






module.exports = router;