const router = require('express').Router();
const books = require('./books');
const author = require('./author');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

//swagger documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send("Hello World! Welcome to the Library API.")
});

router.use('/books', books);
router.use('/authors', author)

module.exports = router;