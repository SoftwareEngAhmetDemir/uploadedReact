var app = require("express")();
var cors = require("cors");
const { ObjectID, ObjectId } = require("mongodb");
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var mresult = [];
app.use(cors());
var Port = process.env.PORT || 8000;
// ///////////////////////
app.get("/", (req, res) => {
  res.send("Mrba");
});
// //////////////////
app.get("/getoran/:ilanid", (req, res) => {
  console.log(req.params.ilanid);
  var MongoClient = require("mongodb").MongoClient;
  var url =
    "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myquery = { ilanid: req.params.ilanid };
    dbo
      .collection("teklif")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });
});
// //////////////////
app.get("/oran/:id/:orani", (req, res) => {
  // console.log(req.params.id)
  var MongoClient = require("mongodb").MongoClient;
  var url =
    "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myquery = { ilanid: req.params.id };

    dbo
    
      .collection("teklif")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        var MongoClient2 = require("mongodb").MongoClient;
        MongoClient2.connect(url, function (err, db2) {
          if (err) throw err;
          var dbo2 = db2.db("test");
          var newvalues = {
            $set: {
              ilanid: result[0].ilanid,
              userid: result[0].userid,
              username: result[0].username,
              fiyat: result[0].fiyat,
              artis: req.params.orani,
            },
          };
          dbo2
            .collection("teklif")
            .updateOne(myquery, newvalues, function (err, res) {
              if (err) throw err;
              io.emit("artis", req.params.orani);
              console.log("1 document updated");
              db.close();
            });
        });

        db.close();
      });
  });
});
app.get("/update/:ilanid/:userid/:username/:fiyat", async (req, res) => {
  var MongoClient = require("mongodb").MongoClient;

  var url =
    "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
  await new Promise((resolve, rej) => {
    MongoClient.connect(url, async function (err, db) {
      var dbo = db.db("test");
      var myquery = { ilanid: req.params.ilanid };
      var newvalues = {
        $set: {
          ilanid: req.params.ilanid,
          userid: req.params.userid,
          username: req.params.username,
          fiyat: req.params.fiyat,
        },
      };
      dbo
        .collection("teklif")
        .updateOne(myquery, newvalues, async function (err, res) {
          if (err) throw err;
          // console.log(res.result.nModified + " document(s) updated");
          resolve("");
          db.close();
        });
    });
  });
  io.emit("name", req.params.fiyat);
  res.send(req.params.fiyat);
});
// ////////////////////

app.get("/tarih/:ilanid", async (req, res) => {
  var MongoClient = require("mongodb").MongoClient;
  var url =
    "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

  var t = [];
  await new Promise((resolve, rej) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      // console.log(req.params.ilanid);
      var query = { ilanid: req.params.ilanid };
      dbo
        .collection("teklif")
        .find(query)
        .toArray(async function (err, result) {
          if (err) throw err;
          t = result;
          // io.emit("name", t[0].fiyat);
          resolve("");

          db.close();
        });
    });
  }).then(async (resolve) => {
    if (t.length === 0) {
      await io.emit("name", "dahayok");
      res.send("");
    } else {
      await io.emit("name", t[0].fiyat);
      res.send("");
    }
  });
});

// ///////////////////////////

app.get("/:ilanid", async (req, res) => {
  var MongoClient = require("mongodb").MongoClient;
  var url =
    "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

  var t = [];
  await new Promise((resolve, rej) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      // console.log(req.params.ilanid);
      var query = { ilanid: req.params.ilanid };
      dbo
        .collection("teklif")
        .find(query)
        .toArray(async function (err, result) {
          if (err) throw err;
          t = result;
          // io.emit("name", t[0].fiyat);
          resolve("");

          db.close();
        });
    });
  }).then(async (resolve) => {
    if (t.length === 0) {
      await io.emit("name", "dahayok");
      res.send("");
    } else {
      await io.emit("name", t[0].fiyat);
      res.send("");
    }
  });
});

// ///////////////////////
app.get(
  "/insertfiyat/:ilanid/:userid/:username/:fiyat/:date",
  async (req, res) => {
    var mresult = [];
    await io.emit("name", req.params.fiyat);
    var MongoClient = require("mongodb").MongoClient;
    var url =
      "mongodb+srv://murat:murat3838@cluster0-2yepv.gcp.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

    // if(mresult.length===0)
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;

      var myobj = {
        ilanid: req.params.ilanid,
        userid: req.params.userid,
        username: req.params.username,
        fiyat: req.params.fiyat,
        end_date: new Date(req.params.date),
      };
      // console.log(myboj);
      var dbo = db.db("test");
      dbo.collection("teklif").insertOne(myobj, function (err, res) {
        if (err) throw err;
        // console.log("1 document inserted");

        db.close();
      });
    });
    res.send("");
  }
);

// ///////////////////
http.listen(Port, () => {
  console.log("listening on *:6000");
});

exports.socketservice = http;
