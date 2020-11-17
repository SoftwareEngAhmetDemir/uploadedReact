const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstateCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const EstateCategory = mongoose.model('estateCategory', EstateCategorySchema);

module.exports = EstateCategory;
