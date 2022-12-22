const Product = require('../models/productModel');
// mongoose imported to check validity of 'id' in function 'getSingleWorkout'
const mongoose = require('mongoose');

// get all products
const getProducts = async (req, res) => {
    // NOTE the .sort() method that is chained. The argument sorts by last created.
    const products = await Product.find({}).sort({createdAt: -1});

    res.status(200).json(products);
}

// get a single product
const getSingleProduct = async (req, res) => {
    const {id} = req.params;

    // this checks if the imported 'id' is valid for purpose of mongoDB
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such product. Invalid id property'})
    }

    const product = await Product.findById(id);

    if (!product) {
        // NOTE: 'return' statement needed to avoid executing code beyond if-statement
        // if condition is true.
        return res.status(404).json({err: 'No such product'})
    }

    res.status(200).json(product)
}

// create new product
const createProduct = async (req, res) => {
        const { 
            name, 
            imageURL, 
            description, 
            category, 
            rating, 
            price,
            oldPrice } = req.body;
        
        // check for empty fields. If field is empty, a string is passed to the 'emptyFields' array
        let emptyFields = [];

        if(!name) {
            emptyFields.push('name')
        }
        if(!imageURL) {
            emptyFields.push('imageURL')
        }
        if(!description) {
            emptyFields.push('description')
        }
        if(!category) {
            emptyFields.push('category')
        }
        if(!rating) {
            emptyFields.push('rating')
        }
        if(!price) {
            emptyFields.push('price')
        }
        // if any fields are empty, length will greater than one.
        if(emptyFields.length > 0) {
            return res.status(400).json({ err: 'Please fill in all the fields', emptyFields})
        }


        try {
            // Create a new product (add doc to db). The .create method is async.
            // When set as 'await', code will not proceed until 
            // const workout is asigned (I think?).
            // First argument of .create() method is the object we
            // want to create.
            const workout = await Product.create({name, imageURL, description, category, rating, price, oldPrice});
            res.status(200).json(workout);
        } catch (err) {
            res.status(400).json({err: err.message})
        }

}

// delete a product
const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such product to delete. Invalid id property'})
    }
    // the object-argument passed is the parameter by which to find the document. Note key name
    // is _id, due to MongoDB specifics
    const product = await Product.findOneAndDelete({ _id: id })

    if (!product) {
        // NOTE: 'return' statement needed to avoid executing code beyond if-statement
        // if condition is true.
        return res.status(404).json({err: 'No such product'});
    }

    res.status(200).json(product);

}

// update a product
const updateProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such product to delete. Invalid id property'})
    }
    // first arg of .findOneAndUpdate() is to identify the document. Second arg represents the updated
    // object.
    const product = await Product.findOneAndUpdate({_id: id}, {
        // the properties are fetched from the .body property of the 
        // request object. The properties included in req.body are output
        // using spread [...] operator.
        ...req.body
    })

    if (!product) {
        // NOTE: 'return' statement needed to avoid executing code beyond if-statement
        // if condition is true.
        return res.status(404).json({err: 'No such product to update'});
    }

    res.status(200).json(product);

}

module.exports = {
    getProducts,
    getSingleProduct, 
    createProduct,
    deleteProduct,
    updateProduct
}