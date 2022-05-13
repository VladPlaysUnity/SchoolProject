import s from './usersInfo.module.css'
import {NavLink, useNavigate} from 'react-router-dom'

const UsersInfo = (props)=>{

  let navigate = useNavigate()

  let addFriend = () =>{
    props.addFriend(props.iD)
  }
  let removeFriend = () =>{
    props.removeFriend(props.iD)
  }

  let changable_button = <button onClick={()=>navigate('/catalog/allUsers')}>Edit mode</button>
  if (props.view == 'notLoggedUsersProfile'){
    changable_button = props.isFriend ? <button onClick={removeFriend}>Remove user from friendlist</button> :
                                        <button onClick={addFriend}>Add User as friend</button>
  } else if (props.view == 'nobodyIsLoggedIn'){
    changable_button = <div></div>
  }

  return(
    <div className={s.add_info}>
      <div className={s.username}><div>{props.username}</div></div>
      <div className={s.add_friend_button}>{changable_button}</div>
      <div className={s.watched_films}><NavLink to={'/user/'+ props.iD +'/watched_films'}><button>Watched films</button></NavLink></div>
      <div className={s.planned_films}><NavLink to={'/user/'+ props.iD + '/planned_films'}><button>Planned films</button></NavLink></div>
      <div className={s.read_books}><NavLink to={'/user/' + props.iD + '/read_books'}><button>Read books</button></NavLink></div>
      <div className={s.planned_books}><NavLink to={'/user/' + props.iD + '/planned_books'}><button>Planned books</button></NavLink></div>
    </div>
  )
}

export default UsersInfo;
