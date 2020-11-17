const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    ilce_id: {
        type: Number,
        required: true,
    },
    ilce_title: {
        type: String,
        required: true,
    },
    ilce_key: {
        type: Number,
        required: true,
    },
    ilce_sehirkey: {
        type: Number,
        required: true,
    },
});

const District = mongoose.model("district", DistrictSchema);

module.exports = District;
