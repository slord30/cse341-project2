const express = require('express');
const booksController = require('../controllers/booksController');
const router = express.Router();
const { isAuthenticated, bookValidationRules, validate } = require('../middleware/validate');


router.get('/', booksController.getAllData);
router.get('/:id', booksController.getSingle);

router.post('/', isAuthenticated, bookValidationRules(), validate, (req, res) => {
    /* #swagger.security = [{
            "GitHubOAuth": []
    }] */
    booksController.createBook(req, res);
});

router.put('/:id', isAuthenticated, bookValidationRules(), validate, (req, res) => {
    /* #swagger.security = [{
        "GitHubOAuth": [
            "read:user"]
    }] */

    booksController.updateBook(req, res)
});

router.delete('/:id', isAuthenticated, (req, res) => {
    /* #swagger.security = [{
            "GitHubOAuth": []
    }] */
    booksController.deleteBook(req, res);
});

module.exports = router;