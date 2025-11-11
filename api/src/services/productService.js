// encapsula la lógica para crear productos 
// en tu base de datos, usando un modelo de Mongoose.  

// Importa el modelo Product: para interactuar 
// con la colección de productos en MongoDB.
const Product = require('../models/Product');


// Define createProduct: una función asíncrona que recibe 
// los datos del producto (productData), 
// crea un nuevo documento y lo guarda en la base de datos.
const createProduct = async(productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
};


const getAllProducts = async () => {
    return await Product.find();
}

// Exporta createProduct: para poder usarla en otras 
// partes de tu aplicación, como en tus rutas o controladores.
module.exports = {
    createProduct,
    getAllProducts,
};

