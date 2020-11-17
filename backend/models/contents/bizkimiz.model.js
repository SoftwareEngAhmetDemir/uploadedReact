const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BizKimizSchema = new Schema({
  created_user: {
    type: Object,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
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

const BizKimiz = mongoose.model('BizKimiz', BizKimizSchema);

module.exports = BizKimiz;
