const express = require("express");

const userRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

function User(iD, usersInfo, friends, markedFictions) {
  this.iD = iD;
  this.usersInfo = usersInfo;
  this.friends = friends;
  this.markedFictions = markedFictions;
}

userRoutes.route("/user/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newUser = {}
  let arr_to_sort = []
  db_connect
    .collection("users")
    .find({ })
    .toArray()
    .then((res)=>{
      let newID = -1
      for (let i=0; i < res.length; i++){
        if (res[i].usersInfo.email == req.body.email){
          return response.json('User with this email already exists')
        }
      }
      for (let i=0; i < res.length; i++){
        if (res[i].usersInfo.name == req.body.name){
          return response.json('This username is already taken')
        }
      }
      if(res.length != 0){
        for (let i=0; i < res.length; i++){
          arr_to_sort.push(parseInt(res[i].iD))
        }
        newID = arr_to_sort.sort(function(a, b) {
          return b - a
        })
        newID = newID[0]
      }
      newUser = {
        iD: newID+1,
        usersInfo: {profilePhoto:'', name:req.body.name, password:req.body.password, email:req.body.email},
        friends: [],
        markedFictions: []
      }
      db_connect.collection("users").insertOne(newUser, function (err, result) {
        if (err) throw err;
        response.json(newUser.iD);
    })
  })

});

userRoutes.route("/user/getUserById/:iD").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  let myquery = { iD: parseInt(req.params.iD)};
  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

userRoutes.route("/user/getAllUsers").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

userRoutes.route("/user/getFictionAtUser/:userID/:fictionID").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  let myquery = { iD: parseInt(req.params.userID)};
  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        let u = result
        for (let i = 0; i < u.markedFictions.length; i++) {
          if(u.markedFictions[i].fiction_id == req.params.fictionID){
              return res.json(u.markedFictions[i].status)
          }
        }
        return res.json('not completed');
      });
});

userRoutes.route("/user/getUsersFriends/:iD").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { iD: parseInt(req.params.iD)};
  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        let friendsOfUser = [];
        let u = result;
        for (let i=0; i < u.friends.length; i++){
          let myq = { iD: u.friends[i]};
          db_connect
              .collection("users")
              .findOne(myq, function (err, r) {
                if (err) throw err;
                friendsOfUser.push(r)
              });
        }
        res.json(friendsOfUser)
      });
});

userRoutes.route("/user/isFriend/:user1/:user2").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { iD: parseInt(req.params.user1)};
  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        let u = result
        if (u.friends.includes(parseInt(req.params.user2))){
          res.json(true)
        }else{
          res.json(false);
        }
      });
});

userRoutes.route("/user/checkIfUsersDataIsRight/:name/:password").get(function (req, res) {
  let db_connect = dbo.getDb("FictionLib");
  db_connect
    .collection("users")
    .find()
    .toArray(function (err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        if ((result[i].usersInfo.name == req.params.name)&&(result[i].usersInfo.password == req.params.password)){
          return res.json(result[i].iD)
        }
      }
      return res.json('Your password or username is not correct')
    });
});

userRoutes.route("/user/changeUsersStatusOfFiction/:iD").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { iD: parseInt(req.params.iD)};
  let found = false
  db_connect
      .collection("users")
      .findOne(myquery, function (err, user) {
        if (err) throw err;
        for (let j = 0; j < user.markedFictions.length; j++) {
          if (user.markedFictions[j].fiction_id == req.body.fiction_id){
            found = true
            if ((req.body.status == 'not completed')){
              let del = { "$set": {} }
              del["$set"]["markedFictions."+j] = -1
              db_connect.collection("users").updateOne(myquery, del)
              .then((r)=>{
                db_connect.collection("users").updateOne(myquery, { $pull : {"markedFictions": -1 }}, function (err, result) {
                    if (err) throw err;
                    res.json(result)
                })
              })
              break;
            } else {
              let upd = { "$set": {} };
              upd["$set"]["markedFictions."+j+".status"] = req.body.status

              db_connect
              .collection("users")
              .updateOne(myquery, upd, function (err, result) {
                  if (err) throw err;
                  res.json(result)
              })
              break;
            }
          }
        }
        if (found == false) {
          db_connect
          .collection("users")
          .updateOne(myquery,{$push:{markedFictions:{fiction_id:req.body.fiction_id, status:req.body.status}}}, function (err, result) {
              if (err) throw err;
              res.json(result)
          })
        }
      });
});

module.exports = userRoutes;
