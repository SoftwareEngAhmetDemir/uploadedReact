const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IletisimSchema = new Schema({
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
});

const Iletisim = mongoose.model('Iletisim', IletisimSchema);

module.exports = Iletisim;
