const mongoose  = require('mongoose');

const authorSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "First name is required"], trim: true},
    lastName: {type: String, required: [true, "Last name is required"], trim: true},
    birthday: {type: String}
});

module.exports = mongoose.model('Author', authorSchema);