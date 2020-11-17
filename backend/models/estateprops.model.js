const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstatepropsSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    order: {
      required: true,
      type: Number,
    },
    text: {
      required: true,
      type: String,
    },
    type: {
      type: String,
      require: true,
    },

    view_name: {
      required: true,
      type: String,
    },
    items: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Estateprops = mongoose.model('Estateprops', EstatepropsSchema);

module.exports = Estateprops;
