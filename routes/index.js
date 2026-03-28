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
    //#swagger.tags = ['Status']
    res.send(req.isAuthenticated() ? `Logged in as ${req.user.displayName}` : "Logged out")
});

router.use('/books', books /* #swagger.tags = ['Books'] */);
router.use('/authors', author /* #swagger.tags = ['Author'] */);

//login and logout routes
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: true
    }),
    (req, res) => {
        res.redirect('/');
    });

router.get('/logout', (req, res, next) => {
    req.logout((err) => {    
        if (err) {return next(err);}
        res.redirect('/');
    });
});

module.exports = router;