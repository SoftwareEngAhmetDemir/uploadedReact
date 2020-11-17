const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstateSchema = new Schema(
  {
    created_user: {
      required: true,
      type: Object,
    },
    active: {
      type: Boolean,
    },

    title: {
      required: true,
      type: String,
    },

    city: {
      type: Object,
      trim: true,
      require: true,
    },

    town: {
      type: Object,
      trim: true,
      require: true,
    },

    neighborhood: {
      type: Object,
      trim: true,
      require: true,
    },
    bank_id: {
      type: Object,
    },
    note: {
      type: String,
      require: true,
      trim: true,
    },
    pdf: {
      type: Array,
    },
    created: {
      type: Date,
      require: true,
    },
    props: {
      type: Object,
      required: true,
    },
    start_price: {
      type: Number,
    },
    part_price: {
      type: Number,
    },
    now_price: {
      type: Number,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    video_embed: {
      type: String,
    },
    chance: {
      type: Array,
    },
    images: {
      type: Array,
    },
    specification: {
      type: String,
      require: true,
      trim: true,
    },
    chance_category: {
      type: Object,
      ref: 'estateCategory',
    },
    customersData: {
      type: Array,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Estate = mongoose.model('Estate', EstateSchema);

module.exports = Estate;
