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
    props.tryLogIn(log_username.current.value, log_password.current.value)
  }

  let signUp = ()=>{
    props.trySignUp(sg_username.current.value,sg_password.current.value, sg_email.current.value)
  }

  return (
    <div className={s.registrationPage}>
      <div className={s.loginBlock}>
        <div className={s.nameOfBlock}>Log in</div>
        <div className={s.username} ><input placeholder="username" type="text" ref={log_username}/></div>
        <div className={s.password} ><input placeholder="password" type="text" ref={log_password}/></div>
        <div><NavLink to={props.user_link}><button onClick={logIn}>Log in</button></NavLink></div>
      </div>
      <hr />
      <div className={s.signUpBlock}>
        <div className={s.nameOfBlock}>Sign up</div>
        <div className={s.username}><input placeholder="username" type="text" ref={sg_username}/></div>
        <div className={s.email}><input placeholder="e-mail" type="text" ref={sg_email}/></div>
        <div className={s.password}><input placeholder="password" type="text" ref={sg_password}/></div>
        <div><button onClick={signUp}>Sign up</button></div>
      </div>
    </div>
  );
};

export default RegistrationPage;
