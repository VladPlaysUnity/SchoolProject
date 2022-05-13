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
  //it is already in regist page
}

async function getAllUsers (){
  //returns list of all fictions
  const response = await fetch(`http://localhost:5000/user/getAllUsers`);

  if (!response.ok) {
     const message = `An error occurred at getAllUsers: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getUserById(user_id){
  //returns fiction whose id was mentioned
  const response = await fetch(`http://localhost:5000/user/getUserById/${user_id}`);

  if (!response.ok) {
     const message = `An error occurred at getUserById: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getFictionAtUser(user_id, fiction_id){
  //returns fiction whose id was mentioned
  const response = await fetch(`http://localhost:5000/user/getFictionAtUser/${user_id}/${fiction_id}`);

  if (!response.ok) {
     const message = `An error occurred at getFictionAtUser: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getUsersFriends (user_id) {
  //returns list of objects(users) which are friends of user
  const response = await fetch(`http://localhost:5000/user/getUsersFriends/${user_id}`);

  if (!response.ok) {
     const message = `An error occurred at getUsersFriends: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function isFriend (user1_id, user2_id){
  const response = await fetch(`http://localhost:5000/user/isFriend/${user1_id}/${user2_id}`);

  if (!response.ok) {
     const message = `An error occurred at isFriend: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
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


export { getAllUsers, getUserById, getFictionAtUser, getUsersFriends, isFriend }
