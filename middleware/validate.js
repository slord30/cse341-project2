const {body, validationResult} = require('express-validator');

const bookValidationRules = () => {
    return [
        body("title").notEmpty().withMessage("Title is required.").trim().escape(),
        body("author").notEmpty().withMessage("Author is required.").trim().escape(),
        body("genre").notEmpty().withMessage("Genre is required.").trim().escape(),
        body("publicationYear").isNumeric().withMessage("Year must be a number."),
        body("isbn").notEmpty().withMessage("ISBN is required.").trim().escape(),
        body("description").notEmpty().withMessage("Description is required.").escape(),
        body("isAvailable").isBoolean().withMessage("Must declare availability.")
    ];
};

const authorValidationRules = () => {
    return [
        body("firstName").notEmpty().withMessage("First name is required.").trim().escape(),
        body("lastName").notEmpty().withMessage("Last name is required.").trim().escape()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty())
        return next();
    return res.status(412).json({errors: errors.array()});
};

module.exports = {bookValidationRules, authorValidationRules, validate};