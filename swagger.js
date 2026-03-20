const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library API',
        description: 'CSE 341 Library API Documentation', 
    },
    host: 'cse341-project2-e3w4.onrender.com',
    schemes: ['https'],
    definitions: {
    Book: {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      publicationYear: 1937,
      isbn: "978-0547928227",
      description: "A great adventure.",
      isAvailable: true
    },
    Author: {
      firstName: "J.R.R.",
      lastName: "Tolkien",
      birthday: "1892-01-03"
    }
  }
};

const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/index.js'];

//this will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Successfully generated swagger.json');
});