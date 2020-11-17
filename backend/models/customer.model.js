const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tckn: {
      type: Number,
      required: true,
    },
    group_id: {
      type: Array,
      trim: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gsm: {
      type: String,
    },
    tel: {
      type: String,
    },
    estates: {
      type: {
        type: Array,
        required: true,
      },
      estate_id: {
        type: Object,
        required: true,
      },
    },
    docs: {
      type: Array,
    },
    country_id: {
      type: String,
    },
    state_id: {
      type: String,
    },
    town: {
      type: String,
    },
    zipcode: {
      type: Number,
    },
    address: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
