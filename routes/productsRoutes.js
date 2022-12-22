const express = require('express');
const {
    createProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productsController');
const router = express.Router();

// GET all products
router.get('/', getProducts);

// GET a single product
router.get('/:id', getSingleProduct);

// POST a new product
router.post('/', createProduct);

// DELETE a product
router.delete('/:id', deleteProduct);

// UPDATE a workout
router.patch('/:id', updateProduct);

// NOTE the difference in exporting controller functions compared to 
// exporting routes below. Here, 'router' is a single object with attached
// properties such as .get() and .delete(). Or so I gather? With the controllers,
// constants are passed as properties of an object, but during import they are destructured
// as discrete constants. I would assume these methods are simply interchageable?
module.exports = router;