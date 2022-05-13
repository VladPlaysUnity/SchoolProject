const express = require("express");

const fictionRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

function Fiction(id, fictionInfo, type, overallRating) {
  this.id = id;
  this.info = fictionInfo;
  this.type = type;
  this.overallRating = overallRating;
}

fictionRoutes.route("/fiction/add").post(function (req, response) {

  let db_connect = dbo.getDb();
  let myobj = {}
  let arr_to_sort = []
  db_connect
    .collection("fictions")
    .find({ })
    .toArray()
    .then((res)=>{
      for (let i=0; i < res.length; i++){
        arr_to_sort.push(parseInt(res[i].iD))
      }
      let newID = arr_to_sort.sort(function(a, b) {
        return b - a
      })
      if (req.body.type == 'b'){
        myobj = {
          iD: newID[0]+1,
          info: {coverPhoto: req.body.photoUrl,
          name: req.body.name,
          author: req.body.maker,
          genre: req.body.genre,
          releaseDate: req.body.date,
          description: req.body.description},
          type: 'book',
          overallRating: []
        }
      } else if (req.body.type == 'f') {
        myobj = {
          iD: newID[0]+1,
          info: {coverPhoto: req.body.photoUrl,
          name: req.body.name,
          author: req.body.maker,
          genre: req.body.genre,
          releaseDate: req.body.date,
          description: req.body.description},
          type: 'film',
          overallRating: []
        }
      }
      db_connect.collection("fictions").insertOne(myobj, function (err, result) {
        if (err) throw err;
        response.json(result);
    })
  })

});

fictionRoutes.route("/fiction/getFictionById/:iD").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { iD: parseInt(req.params.iD)};
  db_connect
      .collection("fictions")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

fictionRoutes.route("/fiction/getAllFictions").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  db_connect
    .collection("fictions")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

fictionRoutes.route("/fiction/getAllFilms").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  db_connect
    .collection("fictions")
    .find({type:'film'})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

fictionRoutes.route("/fiction/getAllBooks").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  db_connect
    .collection("fictions")
    .find({type:'book'})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

fictionRoutes.route("/fiction/getRatingOfFictionFromUser/:fictionID/:userID").get(function (req, response) {

  let db_connect = dbo.getDb();
  let myquery = { iD: parseInt( req.params.fictionID )};
  let f = ''
  db_connect
  .collection("fictions")
  .findOne(myquery, function (err, result) {
      if (err) throw err;
      f = result;
      for (let j = 0; j < f.overallRating.length; j++) {
        if (f.overallRating[j].user == parseInt(req.params.userID)) {
          return response.json(f.overallRating[j].rating)
        }
      }
      return response.json(-1)
    })
});

fictionRoutes.route("/fiction/getOverallRatingOfFiction/:fictionID").get(function (req, response) {

  let db_connect = dbo.getDb();
  let myquery = { iD: parseInt( req.params.fictionID )};
  let f = ''
  let overallRating = 0
  db_connect
  .collection("fictions")
  .findOne(myquery, function (err, result) {
      if (err) throw err;
      f = result;
      if (f.overallRating.length == 0){
        return response.json("No ratings")
      } else{
        for (let j = 0; j < f.overallRating.length; j++) {
          overallRating += parseInt(f.overallRating[j].rating)
        }
        overallRating = (overallRating/f.overallRating.length).toFixed(1)
        response.json(overallRating)
      }
    })
});

fictionRoutes.route("/fiction/changeUsersRatingOfFiction/:fictionID/:userID").post(function (req, response) {

  let db_connect = dbo.getDb();
  let myquery = { iD: parseInt( req.params.fictionID )};
  let f = ''
  db_connect
  .collection("fictions")
  .findOne(myquery, function (err, result) {
      if (err) throw err;
      f = result;
      let ind = null

      for (let j = 0; j < f.overallRating.length; j++) {
        if (f.overallRating[j].user == parseInt(req.params.userID)) {
          ind = j
        }
      }
      if (ind != null){
        if (parseInt(req.body.rating) == -1){
          let del = { "$set": {} }
          del["$set"]["overallRating."+ind] = -1
          db_connect.collection("fictions").updateOne(myquery, del)
          .then((r)=>{
            db_connect.collection("fictions").updateOne(myquery, { $pull : {"overallRating": -1 }}, function (err, result) {
                if (err) throw err;
                response.json(result)
            })
          })
        } else{
          let upd = { "$set": {} };
          upd["$set"]["overallRating."+ind+".rating"] = parseInt(req.body.rating)

          db_connect
          .collection("fictions")
          .updateOne(myquery, upd, function (err, result) {
              if (err) throw err;
              response.json(result)
          })
        }
      } else{
        if (parseInt(req.body.rating) != -1){
          db_connect
          .collection("fictions")
          .updateOne(myquery,{$push:{overallRating:{user:parseInt(req.params.userID), rating:parseInt(req.body.rating)}}}, function (err, result) {
              if (err) throw err;
              response.json(result)
          })
        }
      }
    })
});

module.exports = fictionRoutes;
