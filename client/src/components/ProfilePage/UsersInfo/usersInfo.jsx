import s from './usersInfo.module.css'
import {NavLink, useNavigate} from 'react-router-dom'

const UsersInfo = (props)=>{

  let navigate = useNavigate()

  let follow = () =>{
    props.followUser(props.iD)
  }
  let unfollow = () =>{
    props.unfollowUser(props.iD)
  }

  let changable_button = <button className={s.b4} onClick={()=>{props.togEdit()}}>{props.editMode? "Editing...": "Edit profile"}</button>
  if (props.view == 'notLoggedUsersProfile'){
    changable_button = props.isFollowed ? <button className={s.b4} onClick={unfollow}>Unfollow</button> :
                                        <button className={s.b4} onClick={follow}>Follow</button>
  } else if (props.view == 'nobodyIsLoggedIn'){
    changable_button = <div></div>
  }

  return(
    <div className={s.add_info}>
      <div className={s.username}><div>{props.username}</div></div>
      <div className={s.add_friend_button}>{changable_button}</div>
      <div className={s.watched_films}><NavLink to={'/user/'+ props.iD +'/watched_films'}><button className={s.b3}>Watched films</button></NavLink></div>
      <div className={s.planned_films}><NavLink to={'/user/'+ props.iD + '/planned_films'}><button className={s.b3}>Planned films</button></NavLink></div>
      <div className={s.read_books}><NavLink to={'/user/' + props.iD + '/read_books'}><button className={s.b3}>Read books</button></NavLink></div>
      <div className={s.planned_books}><NavLink to={'/user/' + props.iD + '/planned_books'}><button className={s.b3}>Planned books</button></NavLink></div>
    </div>
  )
}

export default UsersInfo;
