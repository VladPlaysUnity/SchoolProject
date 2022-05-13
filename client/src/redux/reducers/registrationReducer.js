import {addUser, getAllUsers} from './../../DataBase/Users.js'
import {getLoggedUserId, setLoggedUserId} from './../../LocalInfo/localInfo.js'

const LOG_IN = 'LOG-IN';
const SIGN_UP = 'SIGN-UP';

let initialState = {}

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:{
      async function tryLog(){
        const respons = await fetch(`http://localhost:5000/user/checkIfUsersDataIsRight/${action.username}/${action.password}`);

        if (!respons.ok) {
           const message = `An error occurred at registpage: ${respons.statusText}`;
            window.alert(message);
            return;
        }

        setLoggedUserId(await respons.json())
        console.log(getLoggedUserId());
        return state
      }
      tryLog()
    }
    case SIGN_UP:{
      async function signUpFu(name, pass, email) {

        const newUser = { name: name, password: pass, email:email };
        const response = await fetch("http://localhost:5000/user/add", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(newUser),
       })
       if (!response.ok) {
          const message = `An error occurred at registpage: ${response.statusText}`;
           window.alert(message);
           return;
       }
       setLoggedUserId(await response.json());
       return state;
      }
      signUpFu(action.username, action.password, action.email)
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
