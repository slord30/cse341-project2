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

router.use('/books', books 
    /* #swagger.tags = ['Books'] 
       #swagger.definitions['Book'] = {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Classic Fiction',
            publicationYear: 1925,
            isbn: '978-0743273565',
            description: 'A story of wealth and love.',
            isAvailable: true
       }
    */
);
router.use('/authors', author 
    /* #swagger.tags = ['Author'] 
       #swagger.definitions['Author'] = {
            firstName: 'J.R.R.',
            lastName: 'Tolkien',
            birthday: '1892-01-03'
       }
    */
);

module.exports = router;