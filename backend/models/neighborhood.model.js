const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NeighborhoodSchema = new Schema({
    mahalle_id: {
        type: Number,
        required: true,
    },
    mahalle_title: {
        type: String,
        required: true,
    },
    mahalle_key: {
        type: Number,
        required: true,
    },
    mahalle_ilcekey: {
        type: Number,
        required: true,
    },
});

const Neighborhood = mongoose.model("neighborhood", NeighborhoodSchema);

module.exports = Neighborhood;
