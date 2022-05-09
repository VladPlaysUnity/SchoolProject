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
  console.log(req.params.iD);
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

module.exports = fictionRoutes;
