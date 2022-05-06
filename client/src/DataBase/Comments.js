function Comment(id, staticInfo, dynamicInfo) {
  this.id = id;
  this.staticInfo = staticInfo;
  this.dynamicInfo = dynamicInfo;
}

let comment0 = new Comment(0, {author:2, place:3, content:'lol'}, {likes:[], dislikes:[]})
let comment1 = new Comment(1, {author:1, place:1, content:'olol'}, {likes:[], dislikes:[]})
let comment2 = new Comment(2, {author:0, place:0, content:'lolo'}, {likes:[], dislikes:[]})
let comment3 = new Comment(3, {author:1, place:2, content:'lool'}, {likes:[], dislikes:[]})

let dbComments = {comments: [comment0, comment1, comment2, comment3]}


export const addComment = (author_id, place_id, content) => {
  //creates and adds comment to a db
  let newComment = new Comment(dbComments.comments[dbComments.comments.length-1].id + 1, {author:author_id, place:place_id, content:content}, {likes:[], dislikes:[]})
  dbComments.comments.push(newComment)
}

export const changeLikeOrDislikeOfComment = (user_id, comment_id, like_or_dislike) =>{
  //changes the list of likes or dislikes of mentioned comment in db
  console.log(user_id, comment_id, like_or_dislike);
  for (let i = 0; i < dbComments.comments.length; i++) {
    if (dbComments.comments[i].id == comment_id){
      if (like_or_dislike == 'like'){
        if (dbComments.comments[i].dynamicInfo.likes.includes(user_id)){
          for (let j = 0; j < dbComments.comments[i].dynamicInfo.likes.length; j++) {
            if (dbComments.comments[i].dynamicInfo.likes[j] == user_id){
              dbComments.comments[i].dynamicInfo.likes.splice(j,1)
              return 'User has removed the like'
            }
          }
        } else{
          for (let j = 0; j < dbComments.comments[i].dynamicInfo.dislikes.length; j++) {
            if (dbComments.comments[i].dynamicInfo.dislikes[j] == user_id){
              dbComments.comments[i].dynamicInfo.dislikes.splice(j,1)
            }
          }
          dbComments.comments[i].dynamicInfo.likes.push(user_id)
          return 'Success!'
        }
      } else if(like_or_dislike == 'dislike'){
       if (dbComments.comments[i].dynamicInfo.dislikes.includes(user_id)){
         for (let j = 0; j < dbComments.comments[i].dynamicInfo.dislikes.length; j++) {
           if (dbComments.comments[i].dynamicInfo.dislikes[j] == user_id){
             dbComments.comments[i].dynamicInfo.dislikes.splice(j,1)
             return 'User has removed the dislike'
           }
         }
       } else{
         for (let j = 0; j < dbComments.comments[i].dynamicInfo.likes.length; j++) {
           if (dbComments.comments[i].dynamicInfo.likes[j] == user_id){
             dbComments.comments[i].dynamicInfo.likes.splice(j,1)
           }
         }
         dbComments.comments[i].dynamicInfo.dislikes.push(user_id)
         return 'Success!'
       }
      }
    }
  }
}


export const getCommentById = (comment_id) =>{
  //returns comment whose id is metioned
  for (let i = 0; i < dbComments.comments.length; i++) {
    if (dbComments.comments[i].id == comment_id){
      return dbComments.comments[i]
    }
  }
}

export const getUsersComments = (user_id) =>{
  //returns list of all comments of mentioned user
  let usersComments = []
  for (let i = 0; i < dbComments.comments.length; i++) {
    if (dbComments.comments[i].staticInfo.author == user_id){
      usersComments.push(dbComments.comments[i])
    }
  }
  return usersComments
}

export const getFictionsComments = (fiction_id) =>{
  //returns list of all comments which were written under mentioned fiction
  let fictionsComments = []
  for (let i = 0; i < dbComments.comments.length; i++) {
    if (dbComments.comments[i].staticInfo.place == fiction_id){
      fictionsComments.push(dbComments.comments[i])
    }
  }
  return fictionsComments
}

export const getStatusOfCommentFromUser = (user_id, comment_id) =>{
  //returns how user estimated the comment
  for (let i = 0; i < dbComments.comments.length; i++) {
      if (dbComments.comments[i].dynamicInfo.likes.includes(user_id)){
        return 'like'
      } else if (dbComments.comments[i].dynamicInfo.dislikes.includes(user_id)) {
        return 'dislike'
      } else{
        return '0'
      }
    }
}
