const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NedirSchema = new Schema({
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

const Nedir = mongoose.model('Nedir', NedirSchema);

module.exports = Nedir;
