const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// define una ruta POST en '/' que llama a tu controlador 
// para crear productos.  
// Configura una ruta POST en el router (router.post('/')).
// Cuando recibes una petición POST en esa ruta, 
// ejecuta productController.createProduct.
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);


// xporta el router para usarlo en tu app.js u otro archivo principal.
module.exports = router;