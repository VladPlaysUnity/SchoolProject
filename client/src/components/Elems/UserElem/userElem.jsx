import s from './userElem.module.css';
import { useNavigate } from "react-router-dom";


const UserElem = (props) =>{
  let navigate = useNavigate()
  let userLink = '/profile/' + props.iD.toString();
  return (
    <div className={s.userElem}>
      <div className={s.profilePhoto}><img src={props.info.profilePhoto} /></div>
      <div className={s.details}>
        <p>{props.info.name}</p>
      </div>
      <button className={s.butt1} onClick={()=>{navigate(userLink)}}>Look!</button>
    </div>
  )
}

export default UserElem;
