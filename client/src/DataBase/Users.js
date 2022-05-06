function User(id, usersInfo, friends, markedFictions) {
  this.id = id;
  this.usersInfo = usersInfo;
  this.friends = friends;
  this.markedFictions = markedFictions;
}

let user0 = new User(0, {profilePhoto:'', name:'John', password:'123', email:'lol@gmail.com'}, [2, 1], [{fiction_id: 0, status:'dropped'}, {fiction_id: 2, status:'completed'}])
let user1 = new User(1, {profilePhoto:'', name:'Paul', password:'456', email:'lol2@gmail.com'}, [0], [{fiction_id: 0, status:'completed'}, {fiction_id: 1, status:'planned'}])
let user2 = new User(2, {profilePhoto:'', name:'Kate', password:'789', email:'lol3@gmail.com'}, [0], [{fiction_id: 1, status:'in progress'}, {fiction_id: 2, status:'completed'}, {fiction_id: 0, status:'planned'}])

export let dbUsers = {users:[user0, user1, user2]}


export const addUser = (username, password, email) =>{
  //adds user to db
  let newUser = new User(dbUsers.users[dbUsers.users.length-1].id + 1, {name:username, password:password, email:email}, [], [])
  dbUsers.users.push(newUser);
  return newUser.id
}

export const getAllUsers = () =>{
  //returns all users from db
  return dbUsers.users;
}

export const makeUsersFriends = (user1_id, user2_id) =>{
  //adds users to each others friendslists
  for (let i=0;i < dbUsers.users.length; i++){
    if (dbUsers.users[i].id == user1_id){
      dbUsers.users[i].friends.push(user2_id)
    } else if (dbUsers.users[i].id == user2_id){
      dbUsers.users[i].friends.push(user1_id)
    }
  }
  console.log(dbUsers.users);
}

export const stopBeingFriends = (user1_id, user2_id) =>{
  for (let i=0;i < dbUsers.users.length; i++){
    if (dbUsers.users[i].id == user1_id){
      for (let j = 0; j < dbUsers.users[i].friends.length; j++) {
        if (user2_id == dbUsers.users[i].friends[j]){
          dbUsers.users[i].friends.splice(j, 1)
        }
      }
    } else if (dbUsers.users[i].id == user2_id){
      for (let j = 0; j < dbUsers.users[i].friends.length; j++) {
        if (user1_id == dbUsers.users[i].friends[j]){
          dbUsers.users[i].friends.splice(j, 1)
        }
      }
    }
  }
  console.log(dbUsers.users);
}

export const isFriend = (user1_id, user2_id)=>{
  return getUserById(user1_id).friends.includes(user2_id) ? true : false
}

export const getUserById = (user_id) =>{
  //returns user whose id is mentioned
  for (let i=0;i < dbUsers.users.length; i++){
    if (dbUsers.users[i].id == user_id){
      return dbUsers.users[i]
    }
  }
}

export const getUsersFriends = (user_id) =>{
  //returns list of objects(users) which are friends of user
  let friendsOfUser = [];
  let user = getUserById(user_id);
  for (let i=0;i < user.friends.length; i++){
    friendsOfUser.push(getUserById(user.friends[i]))
  }
  return friendsOfUser
}

export const getFictionAtUser = (fiction_id, user_id)=>{
  //returns metioned users status of fiction
  let user = getUserById(user_id);
  for (var i = 0; i < user.markedFictions.length; i++) {
    if (user.markedFictions[i].fiction_id == fiction_id){
      return user.markedFictions[i].status
    }
  }
  return 'not completed'
}

export const changeUsersStatusOfFiction = (user_id, fiction_id, status) =>{
  // changes users status of metioned fiction

  for (let i=0;i < dbUsers.users.length; i++){
    if (dbUsers.users[i].id == user_id){
      for (let j = 0; j < dbUsers.users[i].markedFictions.length; j++) {
        if (dbUsers.users[i].markedFictions[j].fiction_id == fiction_id){
          if ((status == 'not completed')){
            dbUsers.users[i].markedFictions.splice(j, 1)
            return
          } else {
            dbUsers.users[i].markedFictions[j].status = status
            return
          }
        }
      }
      dbUsers.users[i].markedFictions.push({fiction_id:fiction_id, status:status})
      return
    }
  }
}
