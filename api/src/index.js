// Cargar variables del entorno 
require('dotenv').config();

// Importa el framework Express que facilita crear servidores y gestionar 
// rutas http en node.js
const express = require('express');
const connectDB = require('./config/db');
// para importar la funcion connectDB para connectar con mongodb 
// en base a la configuración en .env

// Importa las rutas de productos.
// Todas las rutas definidas en routes/productRoutes.js 
// (como POST, GET, etc., en /api/products).
const productRoutes = require('./routes/productRoutes');
const usuariRoutes = require('./routes/usuariRoutes');

// Crea una instancia de una aplicación Express 
// que será la que maneje las rutas
// y el servidor
const app = express();

// Configura el servidor para que pueda recibir y entender datos en 
// formato JSON en las solicitudes HTTP, como en POST o PUT.
// Es esencial para poder leer req.body en peticiones POST o PUT.
app.use(express.json());

// Ejecuta la función que conecta a la base de datos MongoDB.
connectDB();

// Define una ruta GET en la raíz (/). Cuando alguien accede a esa URL, 
// responde con el mensaje 'API Ecommerce en marxa'
app.get('/', (req, res) => {
    res.send('API Ecommerce en marxa');
    }
);

// Muntem les rutes de productes sota el prefix 'api/products'
// Configura las rutas de productos con prefix /api/products.
// Todas las peticiones a /api/products usarán las rutas 
// definidas en productRoutes.js.
app.use('/api/products', productRoutes);
app.use('/api/usuari', usuariRoutes);

// Asigna al puerto la variable de entorno PORT, si está definida, o usa 3000 por defecto.
const PORT = process.env.PORT || 3000;

// Arranca el servidor en el puerto definido y, cuando está listo, imprime un mensaje en la consola 
// indicando que escucha en ese puerto.  
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`));
