// Importa el servicio createProduct.
const productService = require('../services/productService');


// Define una función createProduct (controlador) que:
// Intenta crear un producto usando los datos de la petición (req.body).
// Si tiene éxito, responde con código 201 y un objeto JSON indicando éxito 
// y el producto creado.
// Si hay error, responde con código 400 y un mensaje de error.

const createProduct = async (req, res) => {

    try{
        const product = await productService.createProduct(req.body);
        res.status(201).json({status: 'success', data: product});
    }catch(error){
        res.status(400).json({status: 'error', message: error.message});
    }

};

const getAllProducts = async (req, res) => {

    try{
        const products = await productService.getAllProducts();
        res.status(200).json({ status:'success', data: products });
        //res.json({ status: 'success', data: products });
    }catch (error){
        res.status(500).json({ status:'error', message: error.message });
    }
}

const getProductById = async (req, res) => {
    
    try{
        const product = await productService.getProductById(req.params.id);
        if(!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado'});
        res.status(200).json({ status: 'success', data: product });
    }catch(error){
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const updateProduct = async (req, res) => {
    
    try{
        const product = await productService.updateProduct(req.params.id, req.body);
        if(!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.status(200).json({ status: 'success', data: product });
    }catch(error){
        res.status(400).json({ status: 'error', message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    
    try{
        const result = await productService.deleteProduct(req.params.id);
        if (!result) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.status(200).json({ status: 'success', message: 'Product borrado correctamente' });
    }catch(error){
        res.status(500).json({ status: 'error', message: error.message});
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}