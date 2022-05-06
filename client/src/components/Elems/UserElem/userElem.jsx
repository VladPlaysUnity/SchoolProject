import s from './userElem.module.css';
import {NavLink} from "react-router-dom";

const UserElem = (props) =>{
  let userLink = '/profile/' + props.id.toString();
  return (
    <div className={s.userElem}>
      <div className={s.profilePhoto}><img src={props.info.profilePhoto} /></div>
      <div className={s.details}>
        <p>{props.info.name}</p>
      </div>
      <div className={s.link_button}><NavLink to={userLink}><button>Look!</button></NavLink></div>
    </div>
  )
}

export default UserElem;
