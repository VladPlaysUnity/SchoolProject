import s from './registrationPage.module.css';
import React from 'react';
import {NavLink} from 'react-router-dom';

const RegistrationPage = (props)=>{

  let log_username = React.createRef();
  let log_password = React.createRef();

  let sg_username = React.createRef();
  let sg_email = React.createRef();
  let sg_password = React.createRef();

  let logIn = ()=>{
    if(log_username.current.value != '', log_password.current.value!=''){
      props.tryLogIn(log_username.current.value, log_password.current.value)
    }

  }

  let signUp = ()=>{
    if(sg_username.current.value!='', sg_password.current.value!='', sg_email.current.value!=''){
      props.trySignUp(sg_username.current.value,sg_password.current.value, sg_email.current.value)
    }
  }

  return (
    <div className={s.registrationPage}>
      <div className={s.loginBlock}>
        <div className={s.nameOfBlock}>Log in</div>
        {props.message[0]=='login' ? props.message[1]: null}
        <div className={s.username} ><input placeholder="username" type="text" ref={log_username}/></div>
        <div className={s.password} ><input placeholder="password" type="text" ref={log_password}/></div>
        <div><button className={s.butt1} onClick={logIn}>Log in</button></div>
      </div>
      <hr />
      <div className={s.signUpBlock}>

        <div className={s.nameOfBlock}>Sign up</div>
        {props.message[0]=='signup' ? props.message[1]: null}
        <div className={s.username}><input placeholder="username" type="text" ref={sg_username}/></div>
        <div className={s.email}><input placeholder="e-mail" type="text" ref={sg_email}/></div>
        <div className={s.password}><input placeholder="password" type="text" ref={sg_password}/></div>
        <div><button className={s.butt1} onClick={signUp}>Sign up</button></div>
      </div>
    </div>
  );
};

export default RegistrationPage;
