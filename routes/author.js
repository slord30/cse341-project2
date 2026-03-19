const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();
const {authorValidationRules, validate} = require('../middleware/validate');


router.get('/', authorController.getAllData);
router.get('/:id', authorController.getSingle);

router.post('/', authorValidationRules(), validate, authorController.createAuthor);

router.put('/:id', authorValidationRules(), validate, authorController.updateAuthor);

router.delete('/:id', authorController.deleteAuthor);

router.post('/', authorValidationRules(), validate);

module.exports = router;