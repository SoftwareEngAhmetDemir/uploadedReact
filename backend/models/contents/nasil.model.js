const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NasilSchema = new Schema({
  created_user: {
    type: Object,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
});

const Nasil = mongoose.model('Nasil', NasilSchema);

module.exports = Nasil;
