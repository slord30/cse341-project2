const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library API',
        description: 'CSE 341 Library API Documentation', 
    },
    host: 'https://cse341-project2-e3w4.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/index.js'];

//this will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Successfully generated swagger.json');
});