const Book = require('../models/books');

const getAllData = async (req, res) => {
    //#swagger.tags = ['Books'] 
    try {
        const books = await Book.find();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Books']  
    try {
        const book = await Book.findById(req.params.id);
        res.setHeader("Content-Type", "application/json");
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found." });
        }
    } catch (err) {
        res.status(400).json({ message: "Invalid ID format." });
    }
};

const createBook = async (req, res) => {
     //#swagger.tags = ['Books']
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Book information',
            schema: { $ref: '#/definitions/Book' } 
    } */
    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
            isbn: req.body.isbn,
            description: req.body.description,
            isAvailable: req.body.isAvailable
        });

        const response = await book.save();
        res.status(201).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message || "Some error occurred when creating book." });
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags = ['Books']
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Book information',
            schema: { $ref: '#/definitions/Book' } 
    } */ 
    try {
        const bookId = (req.params.id);
        const bookData = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
            isbn: req.body.isbn,
            description: req.body.description,
            isAvailable: req.body.isAvailable
        };

        const response = await Book.findByIdAndUpdate(bookId, bookData, { new: true, runValidators: true });
        if (response) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Book not found for your update." });
        }
    } catch (err) {
        res.status(400).json({ message: err.message || "Some error occured while updating the book." })
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags = ['Books']  
    try {
        const response = await Book.findByIdAndDelete(req.params.id);
        if (response) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Book not found for deletion." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || "Some error occurred while deleting the book." });
    }
};

module.exports = {
  getAllData,
  getSingle,
  createBook,
  updateBook,
  deleteBook
};