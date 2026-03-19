const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {type: String, required: [true, 'Title is required'], trim: true},
  author: {type: String, required: [true, 'Author is required'], trim: true},
  genre: {type: String, required: true},
  publicationYear: { 
    type: Number, 
    required: true,
    min: [1000, 'Year must be 4 digits'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  isbn: {type: String, required: true, unique: true},
  description: {type:String, required: true},
  isAvailable: {type: Boolean, default: true}
});

module.exports = mongoose.model('Book', bookSchema);
