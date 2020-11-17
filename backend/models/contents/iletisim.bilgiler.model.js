const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IletisimBilgiSchema = new Schema({
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

const IletisimBilgi = mongoose.model('IletisimBilgi', IletisimBilgiSchema);

module.exports = IletisimBilgi;
