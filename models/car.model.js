  const mongoose = require('mongoose');

  const { Schema } = mongoose;

  const carSchema = Schema({
      registration_number: {
          type: String,
          required: true,
      },
      name: {
          type: String,
          required: true,
          min: 1,
      },
      mark: {
          type: String,
          required: true,
          min: 1,
      },
      color: {
          type: String,
          required: true,
          min: 3,
      },
      price: {
          type: Number,
          required: true,
      },
      fuel: {
          type: String,
          required: true,
          ennum: ['Essence', 'Diesel'],
          default: 'Essence'
      },
      is_saled: {
          type: Boolean,
          required: true,
          default: false,
      },
  });

  module.exports = mongoose.model('car', carSchema);