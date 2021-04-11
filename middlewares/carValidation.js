exports.carValidator = (req, res, next) => {

    req.check('registration_number', 'registration_number is Required !').notEmpty();
    req.check('name', 'Name is Required !').notEmpty();
    req.check('mark', 'Mark is Required !').notEmpty();
    req.check('color', 'Color is Required !').notEmpty();

    req.check('price', 'Price is Required !')
        .notEmpty()
        .isLength({ min: 6, max: 10 })



    const errors = req.validationErrors()

    if (errors) {
        return res.status(400).json(errors)
    }

    next()
}