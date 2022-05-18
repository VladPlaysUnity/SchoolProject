const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const commentRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

function Comment(iD, staticInfo, dynamicInfo) {
  this.iD = iD;
  this.staticInfo = staticInfo;
  this.dynamicInfo = dynamicInfo;
}

//let comment0 = new Comment(0, {author:2, place:3, content:'lol'}, {likes:[], dislikes:[]})
//let comment1 = new Comment(1, {author:1, place:1, content:'olol'}, {likes:[], dislikes:[]})

commentRoutes.route("/comment/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newComment = {}
  let arr_to_sort = []
  db_connect
    .collection("comments")
    .find()
    .toArray()
    .then((res)=>{
      let newID = -1
      if(res.length != 0){
        for (let i=0; i < res.length; i++){
          arr_to_sort.push(parseInt(res[i].iD))
        }
        newID = arr_to_sort.sort(function(a, b) {
          return b - a
        })
        newID = newID[0]
      }
      newComment = {
        iD: newID+1,
        staticInfo:{author:req.body.author, place:req.body.place, content:req.body.content},
        dynamicInfo:{likes:[], dislikes:[]}
      }
      db_connect.collection("comments").insertOne(newComment, function (err, result) {
        if (err) throw err;
        response.json(newComment.iD);
    })
  })
});

commentRoutes.route("/comment/changeLikeOrDislikeOfComment/:iD/").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { iD: parseInt(req.params.iD)};
  db_connect
    .collection("comments")
    .findOne(myquery, function (err, comment) {
      if (err) throw err;
      if (req.body.likeDislike == 'like'){
        if (comment.dynamicInfo.likes.includes(req.body.userID)){
          let upd = {$pull:{"dynamicInfo.likes": req.body.userID}}
          db_connect
          .collection("comments")
          .updateOne(myquery, upd, function (err, res) {
            if (err) throw err;
            response.json('User has removed the like')
          })
        } else {
          let upd = {$pull:{"dynamicInfo.dislikes": req.body.userID}}
          let upd2 = {$push:{"dynamicInfo.likes": req.body.userID}}
          if (comment.dynamicInfo.dislikes.includes(req.body.userID)){
            db_connect
            .collection("comments")
            .updateOne(myquery, upd, function (err, res) {
              if (err) throw err;
              db_connect
              .collection("comments")
              .updateOne(myquery, upd2, function (err, resp) {
                if (err) throw err;
                response.json('Success!')
              })
            })
          } else {
            db_connect
            .collection("comments")
            .updateOne(myquery, upd2, function (err, resp) {
              if (err) throw err;
              response.json('Success!')
            })
          }
        }
      } else if (req.body.likeDislike == 'dislike') {
        if (comment.dynamicInfo.dislikes.includes(req.body.userID)){
          let upd = {$pull:{"dynamicInfo.dislikes": req.body.userID}}
          db_connect
          .collection("comments")
          .updateOne(myquery, upd, function (err, res) {
            if (err) throw err;
            response.json('User has removed the dislike')
          })
        } else {
          let upd = {$pull:{"dynamicInfo.likes": req.body.userID}}
          let upd2 = {$push:{"dynamicInfo.dislikes": req.body.userID}}
          if (comment.dynamicInfo.likes.includes(req.body.userID)){
            db_connect
            .collection("comments")
            .updateOne(myquery, upd, function (err, res) {
              if (err) throw err;
              db_connect
              .collection("comments")
              .updateOne(myquery, upd2, function (err, resp) {
                if (err) throw err;
                response.json('Success!')
              })
            })
          } else {
            db_connect
            .collection("comments")
            .updateOne(myquery, upd2, function (err, resp) {
              if (err) throw err;
              response.json('Success!')
            })
          }
        }
      }
    });
});

commentRoutes.route("/comment/getCommentById/:iD").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  let myquery = { iD: parseInt(req.params.iD)};
  db_connect
      .collection("comments")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

commentRoutes.route("/comment/getUsersComments/:userID").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  db_connect
    .collection("comments")
    .find({})
    .toArray(function (err, comments) {
      if (err) throw err;
      let usersComments = []
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].staticInfo.author == req.params.userID){
          usersComments.push(comments[i])
        }
      }
      res.json(usersComments)
    });

});

commentRoutes.route("/comment/getFictionsComments/:fictionID").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  db_connect
    .collection("comments")
    .find({})
    .toArray(function (err, comments) {
      if (err) throw err;
      let fictionsComments = []
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].staticInfo.place == req.params.fictionID){
          fictionsComments.push(comments[i])
        }
      }
      res.json(fictionsComments)
    });

});

commentRoutes.route("/comment/getStatusOfCommentFromUser/:iD/:userID").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  let myquery = { iD: parseInt(req.params.iD)};
  db_connect
    .collection("comments")
    .findOne(myquery, function (err, comment) {
      if (err) throw err;
      if (comment.dynamicInfo.likes.includes(parseInt(req.params.userID))){
        res.json('like')
      } else if (comment.dynamicInfo.dislikes.includes(parseInt(req.params.userID))) {
        res.json('dislike')
      } else{
        res.json('0')
      }
    });

});

module.exports = commentRoutes;
