const Usuari = require('../models/Usuari');

const usuariService = require('../services/usuariServices');

const registrarse = async (req, res) => {
  try {
    const usuariCreado = await usuariService.registrarUsuari(req.body);
    res.status(201).json({ ok: true, data: usuariCreado });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await usuariService.loginUsuari(req.body);
    res.json({ ok: "Login correcto!!!", token });
  } catch (error) {
    res.status(401).json({ ok: false, message: error.message });
  }
};

module.exports = { registrarse, login };




/*
const registrarse = async (req, res) => {

    try{
        const { nom, email, password } = req.body;
        const usuari = new Usuari({ nom, email, password});
        await  usuari.save();
        res.status(201).json({ message: 'Usuario registrado!!!'});
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    
    try{
        const { email, password } = req.body;
        const usuari = await Usuari.findOne({ email });
        if (!usuari) return res.status(404).json({ message: 'Usuario no encontrado!!!'});
        
        const isCorrect = await bcrypt.compare(password, usuari.password);
        if (!isCorrect) return res.status(401).json({ message: 'Contraseña incorrecta'});

        const token = jwt.sign({ id:usuari._id }, 'secret_key', { expiresIn: '1h'});
        res.json({ message: 'Login correcto!!! ', token });
    }catch(error){
        res.status(500).json({ error: error.message }); 
    }
};*/

module.exports = {
    registrarse,
    login,
};