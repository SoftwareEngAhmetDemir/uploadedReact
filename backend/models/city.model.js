const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    sehir_id: {
        type: Number,
        required: true,
    },
    sehir_title: {
        type: String,
        required: true,
    },
    sehir_key: {
        type: Number,
        required: true,
    },
});

const City = mongoose.model("city", CitySchema);

module.exports = City;
