    // imports //
const mongoose = require('mongoose');

    // setup //
const Schema = mongoose.Schema;

    // Schemas and models
// First argument describes the document structure. Second argument
// in this case sets a timestamp.
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number,
        required: false
    }

// Second argument
}, { timestamps: true });

// Model applies schema to a particular model, then uses the model to
// interact with a collection of the same name.

// First argument: The name 'Product', which denotes the document type in MongoDB, is significant.
// MongoDB will pluralize and create a collection names 'Products' where all individual
// 'Workout' documents are stored.
// Second argument: the schema already defined.

// 'Product' will be imported in various files. Different methods can be chained to the 'Product' variable
// to interact with the collection. E.g. 'Product.find()', which finds all 'Product'.
module.exports = mongoose.model('Product', productSchema);