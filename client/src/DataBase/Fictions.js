async function getFictionById(fiction_id){
  //returns fiction whose id was mentioned
  const response = await fetch(`http://localhost:5000/fiction/getFictionById/${fiction_id}`);

  if (!response.ok) {
     const message = `An error occurred at getFictionById: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getAllFictions (){
  //returns list of all fictions
  const response = await fetch(`http://localhost:5000/fiction/getAllFictions`);

  if (!response.ok) {
     const message = `An error occurred at getAllFictions: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getAllFilms (){
  //returns list of all films
  const response = await fetch("http://localhost:5000/fiction/getAllFilms");

  if (!response.ok) {
     const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getAllBooks (){
  //returns list of all books
  const response = await fetch(`http://localhost:5000/fiction/getAllBooks`);

  if (!response.ok) {
     const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getRatingOfFictionFromUser(fiction_id, user_id){
  //returns rating of mentioned fiction from mentioned user
  const response = await fetch(`http://localhost:5000/fiction/getRatingOfFictionFromUser/${fiction_id}/${user_id}`);

  if (!response.ok) {
     const message = `An error occurred getrating: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

async function getOverallRatingOfFiction(fiction_id){
  //return overall rating of fiction based on ratings of users in overallRating list
  const response = await fetch(`http://localhost:5000/fiction/getOverallRatingOfFiction/${fiction_id}`);
  if (!response.ok) {
     const message = `An error occurred getrating: ${response.statusText}`;
      window.alert(message);
      return;
  }

  return await response.json();
}

export{ getAllFictions, getAllBooks, getAllFilms, getFictionById, getRatingOfFictionFromUser, getOverallRatingOfFiction };
