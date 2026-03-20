const express = require('express');
const booksController = require('../controllers/booksController');
const router = express.Router();
const {bookValidationRules, validate} = require('../middleware/validate');


router.get('/', booksController.getAllData);
router.get('/:id', booksController.getSingle);

router.post('/', bookValidationRules(), validate, booksController.createBook);

router.put('/:id', bookValidationRules(), validate, booksController.updateBook);

router.delete('/:id', booksController.deleteBook);

module.exports = router;