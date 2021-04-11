  const mongoose = require('mongoose');
  const { ObjectId } = mongoose.Schema;

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

      },
      is_saled: {
          type: Boolean,
          required: true,
          default: false,
      },
      photo: {
          data: Buffer,
          contentType: String
      },
      id_place: {
          type: Schema.Types.ObjectId,
          ref: 'place',
          required: true,
      },
  });

  module.exports = mongoose.model('car', carSchema);