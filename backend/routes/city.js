const router = require("express").Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
let City = require("../models/city.model");
let District = require("../models/district.model");
let Neighborhood = require("../models/neighborhood.model");
router
    .route("/public")
    .get((req, res, next) => {
        City.find().then((data) => res.json(data));
    });
// get city items
router
    .route("/")
    .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
        City.find().then((data) => res.json(data));
    });

    router
    .route("/:city")
    .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
        City.find({ sehir_title: req.params.city }).then((data) => res.json(data));
    });

// get district
router
    .route("/district/:id")
    .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
        District.find({ ilce_sehirkey: req.params.id }).then((data) =>
            res.json(data)
        );
    });

// get neighborhood
router
    .route("/neighborhood/:id")
    .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
        Neighborhood.find({ mahalle_ilcekey: req.params.id }).then((data) =>
            res.json(data)
        );
    });

module.exports = router;
