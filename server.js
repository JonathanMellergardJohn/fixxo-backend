    // import and require
require('dotenv').config()
const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const mongoose = require('mongoose');
    // express app //
const app = express();

    // middleware
// Somewhat unclear about this first middleware, but apparently it looks at any 
// request that comes in and looks if it has a body. If it does, it attaches
// that body to the request object.
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

    // routes //
app.use('/api/products', productsRoutes);

    // listen for requests //

// NOTE: the server listen is nested IN the database connection, because we don't 
// want to start listening for requests until we have a connection with the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests //
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })