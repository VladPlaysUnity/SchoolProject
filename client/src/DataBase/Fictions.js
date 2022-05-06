function Fiction(id, fictionInfo, type, overallRating) {
  this.id = id;
  this.info = fictionInfo;
  this.type = type;
  this.overallRating = overallRating;
}

let fiction0 = new Fiction(0, {coverPhoto:require('./../images/overgeared.jpg'), name:'Overgeared', author:'idk', genre:'lightnovel', releaseDate:'12.04.2015', description:'description'}, 'book', [{user:1,rating:8}])
let fiction1 = new Fiction(1, {coverPhoto:require('./../images/solo-leveling.jpg'), name:'Solo-Leveling', author:'idk', genre:'lightnovel', releaseDate:'3.10.2013', description:'description'}, 'book', [{user:2,rating:9}])
let fiction2 = new Fiction(2, {coverPhoto:require('./../images/it_film.jpg'), name:'It', director:'idk', genre:'horror', releaseDate:'3.10.2013', description:'description'}, 'film', [])
let fiction3 = new Fiction(3, {coverPhoto:require('./../images/it_book.jpg'), name:'It', author:'idk', genre:'horror', releaseDate:'3.10.2013', description:'description'}, 'book', [{user:0,rating:7}])
let fiction4 = new Fiction(4, {coverPhoto:require('./../images/ready_player_one.jpeg'), name:'Ready Player One', author:'idk', genre:'sci-fi', releaseDate:'3.10.2013', description:'description'}, 'film', [{user:1,rating:9}])


let dbFictions = {fictions:[fiction0, fiction1, fiction2, fiction3, fiction4]}


export const getFictionById = (fiction_id)=>{
  //returns fiction whose id was mentioned
  for (let i = 0; i <dbFictions.fictions.length; i++) {
    if(dbFictions.fictions[i].id == fiction_id){
      return dbFictions.fictions[i]
    }
  }
}

export const getAllFictions = () =>{
  //returns list of all fictions
  return dbFictions.fictions
}

export const getAllFilms = ()=>{
  //returns all fictions whose type is film
  let films = []
  for (let i = 0; i <dbFictions.fictions.length; i++) {
    if(dbFictions.fictions[i].type == 'film'){
      films.push(dbFictions.fictions[i])
    }
  }
  return films
}

export const getAllBooks = ()=>{
  //returns all fictions whose type is film
  let books = []
  for (let i = 0; i <dbFictions.fictions.length; i++) {
    if(dbFictions.fictions[i].type == 'book'){
      books.push(dbFictions.fictions[i])
    }
  }
  return books
}

export const getRatingOfFictionFromUser=(fiction_id, user_id)=>{
  //returns rating of mentioned fiction from mentioned user
  for (let i = 0; i <dbFictions.fictions.length; i++) {
    if(dbFictions.fictions[i].id == fiction_id){
      for (let j = 0; j < dbFictions.fictions[i].overallRating.length; j++) {
        if (dbFictions.fictions[i].overallRating[j].user == user_id) {
          return dbFictions.fictions[i].overallRating[j].rating
        }
      }
      return 0
    }
  }
}

export const getOverallRatingOfFiction = (fiction_id)=>{
  //return overall rating of fiction based on ratings of users in overallRating list
  let overallRating = 0
  for (let i = 0; i <dbFictions.fictions.length; i++) {
    if(dbFictions.fictions[i].id == fiction_id){
      for (let j = 0; j < dbFictions.fictions[i].overallRating.length; j++) {
        overallRating += parseInt(dbFictions.fictions[i].overallRating[j].rating, 10)
      }
      overallRating = (overallRating/dbFictions.fictions[i].overallRating.length).toFixed(1)
      return overallRating
    }
  }
}

export const changeUsersRatingOfFiction = (fiction_id, user_id, rating) =>{
  // changes mentioned user's rating of fiction in overallRating list of mentioned fiction
  for (var i = 0; i <dbFictions.fictions.length; i++) {
    if(dbFictions.fictions[i].id == fiction_id){
      for (var j = 0; j < dbFictions.fictions[i].overallRating.length; j++) {
        if (dbFictions.fictions[i].overallRating[j].user == user_id){
          if (rating == ''){
            dbFictions.fictions[i].overallRating.splice(j, 1)
            return
          } else {
            dbFictions.fictions[i].overallRating[j].rating = rating
            return
          }
        }
      }
      dbFictions.fictions[i].overallRating.push({user: user_id, rating:rating})
      return
    }
  }
}
