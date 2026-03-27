const router = require('express').Router();
const books = require('./books');
const author = require('./author');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

//swagger documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send("Hello World! Welcome to the Library API.")
});

router.use('/books', books /* #swagger.tags = ['Books'] */);
router.use('/authors', author /* #swagger.tags = ['Author'] */);

//login and logout routes
router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {    
        if (err) {return next(err);}
        res.redirect('/');
    });
});

module.exports = router;