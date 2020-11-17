const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BanksSchema = new Schema({
   created_user: {
      type: Object,
   },
   name: {
      type: String,
   },
   code: {
      type: String,
   },
   order: {
      type: Number,
   },
   images: {
      type: String,
   },
});

const Banks = mongoose.model("Banks", BanksSchema);

module.exports = Banks;
