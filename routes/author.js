const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();
const {isAuthenticated, authorValidationRules, validate} = require('../middleware/validate');


router.get('/', authorController.getAllData);
router.get('/:id', authorController.getSingle);

router.post('/', isAuthenticated, authorValidationRules(), validate, (req, res) => {
    /* #swagger.security = [{
            "GitHubOAuth": []
    }] */
    authorController.createAuthor(req, res);
});

router.put('/:id', isAuthenticated, authorValidationRules(), validate, (req, res) => {
    /* #swagger.security = [{
            "GitHubOAuth": []
    }] */
    authorController.updateAuthor(req, res);
});

router.delete('/:id', isAuthenticated, (req, res) => {
    /* #swagger.security = [{
            "GitHubOAuth": []
    }] */
    authorController.deleteAuthor(req, res);
});

module.exports = router;