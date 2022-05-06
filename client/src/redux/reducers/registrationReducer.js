import {addUser, getAllUsers} from './../../DataBase/Users.js'
import {getLoggedUserId, setLoggedUserId} from './../../LocalInfo/localInfo.js'

const LOG_IN = 'LOG-IN';
const SIGN_UP = 'SIGN-UP';

let initialState = {}

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:{
      let users = getAllUsers()
      for (var i = 0; i < users.length; i++) {
        if (users[i].usersInfo.name == action.username && users[i].usersInfo.password == action.password){
          setLoggedUserId(users[i].id)
          return state
        }
      }
      return state
    }
    case SIGN_UP:{
      let users = getAllUsers()
      for (var i = 0; i < users.length; i++) {
        if (users[i].usersInfo.email == action.email){
          return state
        }
        if (users[i].usersInfo.username == action.username){
          return state
        }
      }
      setLoggedUserId(addUser(action.username, action.password, action.email))
      return state
    }

    default:
      return state;
  }
};

export default registrationReducer;

export const tryLogIn = (username, password) => (
  {type: LOG_IN, username:username, password:password});
export const trySignUp = (username, password, email) => (
  {type: SIGN_UP, username:username, password:password, email:email});
