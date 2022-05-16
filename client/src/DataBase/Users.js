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

async function getUsersFollowedPeople(user_id) {
  //returns list of objects(users) which are friends of user
  const response = await fetch(`http://localhost:5000/user/getUsersFollowedPeople/${user_id}`);

  if (!response.ok) {
     const message = `An error occurred at getUsersFollowedPeople: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function isFollowed (user1_id, user2_id){
  const response = await fetch(`http://localhost:5000/user/isFollowed/${user1_id}/${user2_id}`);

  if (!response.ok) {
     const message = `An error occurred at isFollowed: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function followUser (user1_id, user2_id) {
  //adds user2_id to user1_id followList
  let response = await fetch(`http://localhost:5000/user/follow/${user1_id}`, {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({targetID:user2_id}),
 })

  return await response.json()
}

async function unfollowUser (user1_id, user2_id) {
  //deletes user2_id from user1_id followList
  let response = await fetch(`http://localhost:5000/user/unfollow/${user1_id}`, {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({targetID:user2_id}),
 })

  return await response.json()
}


export { getAllUsers, getUserById, getFictionAtUser, getUsersFollowedPeople, isFollowed, followUser, unfollowUser }
