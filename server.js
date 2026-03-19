const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const indexRoutes = require('./routes/index');

const port = process.env.PORT || 3000;

connectDB().catch(err => {
    console.log("Failed to start server: ", err);
});


app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});