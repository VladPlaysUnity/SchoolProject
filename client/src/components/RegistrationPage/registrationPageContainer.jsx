import RegistrationPage from './registrationPage.jsx'

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import {  } from './../../redux/reducers/registrationReducer';
import { getLoggedUserId, setLoggedUserId, getLoggedInStatus } from './../../LocalInfo/localInfo.js'

const RegistrationPageContainer = (props) =>{
  const [message, setMessage] = useState(['', ''])

  async function tryLog(username, password){
    const respons = await fetch(`http://localhost:5000/user/checkIfUsersDataIsRight/${username}/${password}`);

    if (!respons.ok) {
       const message = `An error occurred at registpage: ${respons.statusText}`;
        window.alert(message);
        return;
    }

    let r = await respons.json();
    if ((r == 'Your password or username is not correct')){
      console.log(r);
      setMessage(['login', r])
    }else{
      console.log(setLoggedUserId(r));
      props.setLoggedUser(r)
    }
  }

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

   let r = await response.json();
   if ((r == 'User with this email already exists')||(r == 'This username is already taken')){
     console.log(r);
     setMessage(['signup', r])
   }else{
     console.log(setLoggedUserId(r));
     props.setLoggedUser(r)
   }
  }

  async function logInFunc(username, password){
    tryLog(username, password)
  }
  async function signUpFunc (name, pass, email){
    signUpFu(name,pass,email)
  }
  return(
    <RegistrationPage tryLogIn={logInFunc} trySignUp={signUpFunc} message={message}/>
  )
}

export default RegistrationPageContainer;
