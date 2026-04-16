const express = require('express');
const router = express.Router();
const {getProductos} = require('../controllers/products.controller');

router.get('/products', getProductos);

module.exports = router;