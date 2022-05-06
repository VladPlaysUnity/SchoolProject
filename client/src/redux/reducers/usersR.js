import {getUserFromDataBase,getUsersFromDataBase, addUser, updateUser} from './../../DataBase/Users.jsx'

const LOG_IN = 'LOG_IN';
const SIGN_UP = 'SIGN-UP';
const ADD_LIKED_OR_DISLIKED_COMMENT = 'ADD_LIKED_OR_DISLIKED_COMMENT';


let intialState = {status:'-', loggedUser:'', users: getUsersFromDataBase()};

const usersReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOG_IN:{
      for (let i=0; i<state.users.length;i++){
        if ((state.users[i].usersInfo.name == action.username) && (state.users[i].usersInfo.password == action.password)){
          let stateCopy = {...state}
          stateCopy.loggedUser = state.users[i]
          stateCopy.status = '+';
          return stateCopy;
        }
      }

      return state;
    }
    case SIGN_UP:{
      for (let i=0; i<state.users.length;i++){
        if (state.users[i].usersInfo.name == action.username){
          return state;
        }
      }
      let stateCopy = {...state}

      let newUser = {id:[stateCopy.users.length-1],usersInfo:{name:action.username, email:action.email, password:action.password}, commentsInfo:{likedComments:[], dislikedComments:[]},markedBooks:[], markedFilms:[], lastReadBook:'', lastWatchedFilm:''}

      stateCopy.users = addUser(newUser);
      stateCopy.loggedUser = stateCopy.users[stateCopy.users.length-1]
      stateCopy.status = '+';
      return stateCopy;
    }
    case ADD_LIKED_OR_DISLIKED_COMMENT:{

      for (let i=0; i<state.loggedUser.commentsInfo.likedComments.length; i++){
        if (action.id == state.loggedUser.commentsInfo.likedComments[i].id){
          return state
        }
      }
      for (let i=0; i<state.loggedUser.commentsInfo.dislikedComments.length; i++){
        if (action.id == state.loggedUser.commentsInfo.dislikedComments[i].id){
          return state
        }
      }

      let stateCopy = {...state}

      if (action.like_or_dislike == 'like'){
        stateCopy.loggedUser.commentsInfo.likedComments = [...stateCopy.loggedUser.commentsInfo.likedComments]
        stateCopy.loggedUser.commentsInfo.likedComments.push(action.id)
        updateUser(stateCopy.loggedUser.id, {...stateCopy.loggedUser})
      }else if (action.like_or_dislike == 'dislike'){
        stateCopy.loggedUser.commentsInfo.dislikedComments = [...stateCopy.loggedUser.commentsInfo.dislikedComments]
        stateCopy.loggedUser.commentsInfo.dislikedComments.push(action.id)
        updateUser(stateCopy.loggedUser.id, {...stateCopy.loggedUser})
      }
      return stateCopy;
    }

    default:
      return state;
  }
};

export default usersReducer;

export const tryLogIn = (username, password) => (
  {type: LOG_IN, username:username, password:password});
export const trySignUp = (username, password, email) => (
  {type: SIGN_UP, username:username, password:password, email:email});
export const likeOrDislikeCommentActionCreator = (comment_id, like_or_dislike) => (
    {type: ADD_LIKED_OR_DISLIKED_COMMENT, id:comment_id, like_or_dislike:like_or_dislike});
