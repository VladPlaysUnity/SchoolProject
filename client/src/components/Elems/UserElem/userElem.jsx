import s from './userElem.module.css';
import { useNavigate } from "react-router-dom";


const UserElem = (props) =>{
  let navigate = useNavigate()
  let userLink = '/profile/' + props.iD.toString();
  return (
    <div className={s.userElem}>
      <div className={s.profilePhoto}><img src={(props.info.profilePhoto!='')?props.info.profilePhoto:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=170667a&w=0&h=FXkT-N6vISLOCUefa9MyQg0pH-6loMX9zBZjgLK458c="} /></div>
      <div className={s.details}>
        <p>{props.info.name}</p>
      </div>
      <button className={s.butt1} onClick={()=>{navigate(userLink)}}>Look!</button>
    </div>
  )
}

export default UserElem;
