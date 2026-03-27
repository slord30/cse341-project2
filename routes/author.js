const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();
const {isAuthenticated, authorValidationRules, validate} = require('../middleware/validate');


router.get('/', authorController.getAllData);
router.get('/:id', authorController.getSingle);

router.post('/', isAuthenticated, authorValidationRules(), validate, authorController.createAuthor);

router.put('/:id', isAuthenticated, authorValidationRules(), validate, authorController.updateAuthor);

router.delete('/:id', isAuthenticated, authorController.deleteAuthor);

module.exports = router;