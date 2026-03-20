const Author = require('../models/author');

const getAllData = async (req, res) => {
    //#swagger.tags = ['Author'] 
    try {
        const authors = await Author.find();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(authors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Author']  
    try {
        const author = await Author.findById(req.params.id);
        res.setHeader("Content-Type", "application/json");
        if (author) {
            res.status(200).json(author);
        } else {
            res.status(404).json({ message: "Author not found." });
        }
    } catch (err) {
        console.error("Error details:", err); 
        res.status(400).json({ message: "Invalid ID format." });
    }
};

const createAuthor = async (req, res) => {
    //#swagger.tags = ['Author']  
    try {
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday
        });

        const response = await author.save();
        res.status(201).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message || "Some error occurred when creating author." });
    }
};

const updateAuthor = async (req, res) => {
    //#swagger.tags = ['Author']
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Author information',
            schema: {
                firstName: 'J.R.R.',
                lastName: 'Tolkien',
                birthday: '1892-01-03'
            }
    } */ 
    try {
        const authorId = (req.params.id);
        const authorData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday
        };

        const response = await Author.findByIdAndUpdate(authorId, authorData, { new: true, runValidators: true });
        if (response) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Author not found for your update." });
        }
    } catch (err) {
        res.status(400).json({ message: err.message || "Some error occured while updating the author." })
    }
};

const deleteAuthor = async (req, res) => {
    //#swagger.tags = ['Author']  
    try {
        const response = await Author.findByIdAndDelete(req.params.id);
        if (response) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Author not found for deletion." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || "Some error occurred while deleting the author." });
    }
};

module.exports = {
  getAllData,
  getSingle,
  createAuthor,
  updateAuthor,
  deleteAuthor
};