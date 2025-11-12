const Usuari = require('../models/Usuari'); 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Funció per a registrar usuari
const registrarUsuari = async ({ nom, email, password }) => {
    // Validar si l'email ja existeix
    const existe = await Usuari.findOne({ email });
    if (existe) throw new Error('Email ja està en ús');

    // Ya está en el model para que se encripte antes de guardar en la BBDD
    //const salt = await bcrypt.genSalt(10);
    //const hashPassword = await bcrypt.hash(password, salt);

    const nouUsuari = new Usuari({ nom, email, password });
    await nouUsuari.save();

  // Retornar info sense el password xifrat
  return { id: nouUsuari._id, nom, email }; 

/*try{
        const { nom, email, password } = req.body;
        const usuari = new Usuari({ nom, email, password});
        await  usuari.save();
        res.status(201).json({ message: 'Usuario registrado!!!'});
    }catch(error){
        res.status(400).json({ error: error.message });
    }*/


};

// Funció per a login
const loginUsuari = async ({ email, password }) => {
  const usuari = await Usuari.findOne({ email });
  if (!usuari) throw new Error('Usuari no trobat');

  const verificacion = await bcrypt.compare(password, usuari.password);
  if (!verificacion) throw new Error('Contrasenya incorrecta');

  const token = jwt.sign({ id: usuari._id, email: usuari.email }, 'secret_key', {
    expiresIn: '1h',
  });
     
  return token;
};

module.exports = { registrarUsuari, loginUsuari };
