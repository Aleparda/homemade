const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

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
    password: {
        type: String,
        required: true
    },


});

// Antes de guardar, encriptar la contraseña
usuariSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


// Validación del email
/*usuariSchema.path('email').validate(function (value){
    // Para validar un dominio del email
    return value.endsWidth('@gmail.com');
}, 'El Email tiene que ser de @gmail.com');*/

module.exports = mongoose.model('Usuari', usuariSchema);
// mongoose.model: Crea un modelo de Mongoose llamado 'Usuari' basado en el 
// esquema usuariSchema. Este modelo es como una clase que te permite 
// interactuar con la colección de MongoDB correspondiente y 
// realizar operaciones como crear, leer, actualizar y eliminar documentos.

// module.exports: Esto hace que ese modelo esté disponible 
// para ser utilizado en otros archivos del proyecto. 
// Lo exportas para que puedas importarlo después y usarlo en las 
// rutas o controladores.