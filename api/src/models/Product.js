const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  preu: {
    type: Number,
    required: true,
    min: 0,
    max: 10000,
  },
  categoria: {
    type: String,
    enum: ['roba', 'electronica', 'joguina', 'altres'],
  },
});

// Validación custom para precio (ejemplo)
productSchema.path('preu').validate(function (value) {
  // Validar que el precio sea múltiplo de 0.99 por ejemplo
  return (value * 100) % 99 === 0;
}, 'El preu ha de ser múltiple de 0.99');

module.exports = mongoose.model('Product', productSchema);
