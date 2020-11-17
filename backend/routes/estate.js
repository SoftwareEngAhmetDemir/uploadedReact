const router = require("express").Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
let Estate = require("../models/estate.model");
let User = require("../models/user.model");
const { dateFormat } = require("highcharts");
let ObjectId = require("mongodb").ObjectId;
const Moment = require("moment");
const cors = require("cors");

router.use(cors());
const title = "Estate";
const roleTitle = "estates";
// ///////////////



// ////////////////////////
router.route("/ticaribar/:ticarituru").get((req, res, next) => {
  Estate.aggregate([
    {
      $group: {
        _id: { Ticari: "$props.Ticari" },
        count: { $sum: 1 },
      },
    },
  ]).then((data) => res.json(data));
});

router.route("/isinmatipi").get((req, res) => {
  Estate.aggregate([
    {
      $group: {
        _id: "$props.isinmatipi",
      },
    },
  ]).then((data) => res.json(data));
});

router.route("/public").get((req, res, next) => {
  Estate.find()
    .then((data) => {
      res.json(data);
      // console.log(data);
    })
    .catch((err) => console.log(""));
});
// /////////////////////////////
router.route("/public/:id").get((req, res, next) => {
  Estate.find({ _id: req.params.id })
    .then((data) => {
      res.json(data);
      //  console.log(data);
    })
    .catch((err) => console.log(""));
});
/////////////////////////////////
// get all items
router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "list"]) {
        Estate.find()
          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: "Error: " + err,
              variant: "error",
            })
          );
      } else if (rolesControl[roleTitle + "onlyyou"]) {
        Estate.find({ "created_user.id": `${req.user._id}` })
          .then((data) => {
            res.json(data);
          })
          .catch((err) =>
            res.json({
              messagge: "Error: " + err,
              variant: "error",
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            variant: "error",
          },
        });
      }
    });
  });

// post new items
router
  .route("/add")
  .post(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "create"]) {
        new Estate(req.body)
          .save()
          .then(() =>
            res.json({
              messagge: title + " Added",
              variant: "success",
            })
          )
          .catch((err) =>
            res.json({
              messagge: " Error: " + err,
              variant: "error",
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            variant: "error",
          },
        });
      }
    });
  });

// payments list
router
  .route("/payments/:id")
  .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "list"]) {
        Estate.find({ _id: req.params.id })
          .then((data2) => {
            res.json(data2);
          })
          .catch((err) =>
            res.json({
              messagge: " Error: " + err,
              variant: "error",
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            variant: "error",
          },
        });
      }
    });
  });

// statistic
router
  .route("/statistic")
  .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "list"]) {
        Estate.aggregate([
          { $unwind: "$group_id" },
          {
            $group: {
              _id: "$group_id.label",
              count: { $sum: 1 },
            },
          },
        ]).then((data) => res.json(data));
      }
    });
  });
router.route("/Ticari").get((req, res, next) => {
  Estate.aggregate([
    {
      $group: {
        _id: { Ticari: "$props.Ticari", City: "$city" },
        count: { $sum: 1 },
      },
    },
  ]).then((data) => res.json(data));
});

router.route("/city").get((req, res, next) => {
  Estate.aggregate([
    {
      $group: { _id: { city: "$city" }, count: { $sum: 1 } },
    },
  ]).then((data) => res.json(data));
});

////////////////
// mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
router
  .route("/teklif/:ilanid/:userid/:username/:fiyat")
  .get((req, res, next) => {
    var MongoClient = require("mongodb").MongoClient;

    var url =
      "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      var myobj = {
        sabitId: "1234",
        userid: req.params.userid,
        username: req.params.username,
        ilanid: req.params.ilanid,
        Fiyat: req.params.fiyat,
        Date: new Date(),
        ihaliyekatilan: 0,
      };
      console.log(myobj);
      var myquery = { ilanid: req.params.ilanid };
      var newvalues = {
        $set: {
          sabitId: "1234",
          userid: req.params.userid,
          username: req.params.username,
          ilanid: req.params.ilanid,
          Fiyat: req.params.fiyat,
          Date: new Date(),
          ihaliyekatilan: 0,
        },
      };
      dbo
        .collection("teklif")
        .updateOne(myquery, newvalues, { upsert: true }, function (err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
    });
    res.send("inserted");
  });

// ///////////////////

router.route("/insertf/:ilanid/:userid/:username/:fiyat").get((req, res) => {
  var MongoClient = require("mongodb").MongoClient;
  var url =
    "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    var dbo = db.db("test");

    var newvalues = {
      sabitId: "1234",
      userid: req.params.userid,
      username: req.params.username,
      ilanid: req.params.ilanid,
      Fiyat: req.params.fiyat,
      Date: new Date(),
      ihaliyekatilan: 0,
    };
    dbo.collection("teklif").insertOne(newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
});

router.route("/ilanbulmak/:ilanid").get((req, res) => {
  var MongoClient = require("mongodb").MongoClient;
  var url =
    "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    var dbo = db.db("test");
    var query = { ilanid: req.params.ilanid };

    ///////////////////
    dbo
      .collection("teklif")
      .find(query)
      .toArray(function (err, result) {
        if (err) res.send("yok");
        if (result.length === 0) res.send("yok");
        if (result.length > 0) {
          console.log(result);
          res.json(result);
        }

        db.close();
      });

    ////////////////
  });
});

//   ////////////////////
router.route("/getuserdata/:id").get((req, res) => {
  var MongoClient = require("mongodb").MongoClient;
  var url =
    "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var query = { ilanid: req.params.id };
    dbo
      .collection("teklif")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        result.map((e) => {
          console.log(e._id);
        });
        res.json(result);
        db.close();
      });
  });
});
////////////////////////////////
// fetch data by id
router
  .route("/:id")
  .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "list"]) {
        Estate.findById(req.params.id)
          .then((data) => res.json(data))
          .catch((err) =>
            res.status(400).json({
              messagge: "Error: " + err,
              variant: "error",
            })
          );
      } else if (rolesControl[roleTitle + "onlyyou"]) {
        Estate.findOne({
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        })
          .then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(403).json({
                message: {
                  messagge: "You are not authorized, go away!",
                  variant: "error",
                },
              });
            }
          })
          .catch((err) =>
            res.status(400).json({
              messagge: "Error: " + err,
              variant: "error",
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            variant: "error",
          },
        });
      }
    });
  });

// delete data by id
router
  .route("/:id")
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "remove"]) {
        Estate.findByIdAndDelete(req.params.id)
          .then((data) =>
            res.json({
              messagge: title + " Deleted",
              variant: "info",
            })
          )
          .catch((err) =>
            res.json({
              messagge: "Error: " + err,
              variant: "error",
            })
          );
      } else if (rolesControl[roleTitle + "onlyyou"]) {
        Estate.deleteOne({
          _id: req.params.id,
          "created_user.id": `${req.user._id}`,
        })
          .then((resdata) => {
            if (resdata.deletedCount > 0) {
              res.json({
                messagge: title + " delete",
                variant: "success",
              });
            } else {
              res.status(403).json({
                message: {
                  messagge: "You are not authorized, go away!",
                  variant: "error",
                },
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: "Error: " + err,
              variant: "error",
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            variant: "error",
          },
        });
      }
    });
  });

// update data by id
router
  .route("/:id")
  .post(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "edit"]) {
        Estate.findByIdAndUpdate(req.params.id, req.body)
          .then(() =>
            res.json({
              messagge: title + " Update",
              variant: "success",
            })
          )
          .catch((err) =>
            res.json({
              messagge: "Error: " + err,
              variant: "error",
            })
          );
      } else if (rolesControl[roleTitle + "onlyyou"]) {
        Estate.findOneAndUpdate(
          {
            _id: req.params.id,
            "created_user.id": `${req.user._id}`,
          },
          req.body
        )
          .then((resdata) => {
            if (resdata) {
              res.json({
                messagge: title + " Update",
                variant: "success",
              });
            } else {
              res.json({
                messagge: " You are not authorized, go away!",
                variant: "error",
              });
            }
          })
          .catch((err) =>
            res.json({
              messagge: "Error: " + err,
              variant: "error",
            })
          );
      } else {
        res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            variant: "error",
          },
        });
      }
    });
  });

// update datapayments by id
router
  .route("/editpayments/:id")
  .post(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "edit"]) {
        Estate.updateMany(
          {
            "payments._id": ObjectId(req.params.id),
          },
          { $set: { "payments.$.amount": req.body.amount } }
        ).catch((err) => console.log(err));
      } else {
        res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            variant: "error",
          },
        });
      }
    });
  });

// add datapayments by id
router
  .route("/addpayments/:id")
  .post(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "create"]) {
        Estate.updateMany(
          {
            _id: ObjectId(req.params.id),
          },
          {
            $push: {
              payments: {
                amount: req.body.amount,
                paid_data: Moment(Date.now())._d,
                _id: ObjectId(),
              },
            },
          }
        ).catch((err) => console.log(err));
      } else {
        res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            variant: "error",
          },
        });
      }
    });
  });

// update datapayments by id
router
  .route("/deletepayments/:id")
  .get(passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.find({ username: req.user.username }).then((data) => {
      const rolesControl = data[0].role[0];
      if (rolesControl[roleTitle + "edit"]) {
        Estate.updateMany(
          {},
          { $pull: { payments: { _id: ObjectId(req.params.id) } } },
          { multi: true }
        ).catch((err) => console.log(err));
      } else {
        res.status(403).json({
          message: {
            messagge: "You are not authorized, go away!",
            variant: "error",
          },
        });
      }
    });
  });

module.exports = router;
