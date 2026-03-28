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

const isAuthenticated = (req, res, next) => {
    console.log("Checking authentication...");
    console.log("Session User:", req.session.user);
    console.log("Is Authenticated:", req.isAuthenticated());
    if(req.session.user === undefined){
        return res.status(401).json("You don't have access.");
    }
    next();
}

const authorValidationRules = () => {
    return [
        body("firstName").notEmpty().withMessage("First name is required.").trim().escape(),
        body("lastName").notEmpty().withMessage("Last name is required.").trim().escape(),
        body("birthday").optional().isISO8601().withMessage("Birthday must be a valid date (YYYY-MM-DD).")

    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty())
        return next();
    return res.status(412).json({errors: errors.array()});
};

module.exports = {bookValidationRules, authorValidationRules, validate, isAuthenticated};