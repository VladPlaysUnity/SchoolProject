import RegistrationPage from './registrationPage.jsx'

import {tryLogIn, trySignUp} from './../../redux/reducers/registrationReducer';
import {getLoggedUserId} from './../../LocalInfo/localInfo.js'

const RegistrationPageContainer = (props) =>{

  let link =  '/registration';
  if (typeof getLoggedUserId() == 'number'){
    link = '/profile/' + getLoggedUserId()
  }

  let logInFunc = (username, password) =>{
    props.dispatch(tryLogIn(username, password))
  }
  let signUpFunc = (username, password, email) =>{
    props.dispatch(trySignUp(username, password, email))
  }
  return(
    <RegistrationPage tryLogIn={logInFunc} trySignUp={signUpFunc} user_link={link}/>
  )
}

export default RegistrationPageContainer
