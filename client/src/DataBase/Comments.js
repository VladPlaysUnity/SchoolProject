async function addComment (author_id, place_id, content) {
  //creates and adds comment to a db
}


async function getCommentById (comment_id) {
  //returns comment whose id is metioned
  const response = await fetch(`http://localhost:5000/comment/getCommentById/${comment_id}`);

  if (!response.ok) {
     const message = `An error occurred at getUserById: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getUsersComments (user_id) {
  const response = await fetch(`http://localhost:5000/comment/getUsersComments/${user_id}`);

  if (!response.ok) {
     const message = `An error occurred at getUserById: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getFictionsComments (fiction_id) {
  //
  const response = await fetch(`http://localhost:5000/comment/getFictionsComments/${fiction_id}`);

  if (!response.ok) {
     const message = `An error occurred at getUserById: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getStatusOfCommentFromUser (comment_id, user_id) {
  //
  const response = await fetch(`http://localhost:5000/comment/getStatusOfCommentFromUser/${comment_id}/${user_id}`);

  if (!response.ok) {
     const message = `An error occurred at getStatusOfCommentFromUser: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function likeOrDislike (comment_id, user_id, like_or_dislike) {
  await fetch(`http://localhost:5000/comment/changeLikeOrDislikeOfComment/${comment_id}`, {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({userID: user_id, likeDislike: like_or_dislike}),
 })
 .catch(error => {
   window.alert(error);
   return;
 });
}

export{ getCommentById, getUsersComments, getFictionsComments, getStatusOfCommentFromUser, likeOrDislike}
