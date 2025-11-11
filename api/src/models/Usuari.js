const mongoose = require('mongoose');

const usuariSchema = new mongoose.Schema({

    nom: {
        type: String,
        required: true,             // Obligatorio
        maxlength: 50,              // Longitud máxima
    },
    email: {
        type: String,
        required: true,
        unique: true,               // No duplicados
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación email con regex
    },
    edat: {
        type: Number,
        min: 18,
        max: 99,
    },
    rol: {
        type: String,
        enum: ['client', 'admin'],  // Solo estos valores
        default: 'client',
    },

});

// Validación del email
usuariSchema.path('email').validate(function (value){
    // Para validar un dominio del email
    return value.endsWidth('@gmail.com');
}, 'El Email tiene que ser de @gmail.com');

module.exports = mongoose.model('Usuario', usuariSchema);
// mongoose.model: Crea un modelo de Mongoose llamado 'Usuari' basado en el 
// esquema usuariSchema. Este modelo es como una clase que te permite 
// interactuar con la colección de MongoDB correspondiente y 
// realizar operaciones como crear, leer, actualizar y eliminar documentos.

// module.exports: Esto hace que ese modelo esté disponible 
// para ser utilizado en otros archivos del proyecto. 
// Lo exportas para que puedas importarlo después y usarlo en las 
// rutas o controladores.