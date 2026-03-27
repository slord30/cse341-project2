const express = require('express');
const booksController = require('../controllers/booksController');
const router = express.Router();
const {isAuthenticated, bookValidationRules, validate} = require('../middleware/validate');


router.get('/', booksController.getAllData);
router.get('/:id', booksController.getSingle);

router.post('/', isAuthenticated, bookValidationRules(), validate, booksController.createBook);

router.put('/:id', isAuthenticated, bookValidationRules(), validate, booksController.updateBook);

router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;