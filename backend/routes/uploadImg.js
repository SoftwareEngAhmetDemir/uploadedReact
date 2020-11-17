const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");

const fs = require('fs')

const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)



router.post("/uploadimg/:path", function (req, res) {

   var storage = multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, "./build/uploads/" + req.params.path);
      },
      filename: function (req, file, cb) {
         cb(null, Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9,.,/]/g, "_"));
      },
   });

   var upload = multer({ storage: storage }).array("file");

   upload(req, res, function (err) {

      if (err instanceof multer.MulterError) {
         return res.status(500).json(err);

      } else if (err) {

         return res.status(500).json(err);

      }

      return res.status(200).send(req.files);

      // Everything went fine.
   });
});


router.post("/removefile", function (req, res) {
   unlinkAsync("./build" + req.body.file)
});

module.exports = router;
