import s from './usersInfo.module.css'
import {NavLink} from 'react-router-dom'

const UsersInfo = (props)=>{

  let addFriend = () =>{
    props.addFriend(props.id)
  }
  let removeFriend = () =>{
    props.removeFriend(props.id)
  }

  let changable_button = <button>Edit mode</button>
  if (props.type == 'notLoggedUsersProfile'){
    changable_button = props.isFriend ? <button onClick={removeFriend}>Remove user from friendlist</button> :
                                        <button onClick={addFriend}>Add User as friend</button>
  } else if (props.type == 'nobodyIsLoggedIn'){
    changable_button = <div></div>
  }

  return(
    <div className={s.add_info}>
      <div className={s.username}><div>{props.username}</div></div>
      <div className={s.add_friend_button}>{changable_button}</div>
      <div className={s.watched_films}><NavLink to={'/profile/'+ props.id + '/watched_films'}><button>Watched films</button></NavLink></div>
      <div className={s.planned_films}><NavLink to={'/profile/'+ props.id + '/planned_films'}><button>Planned films</button></NavLink></div>
      <div className={s.read_books}><NavLink to={'/profile/'+ props.id + '/read_books'}><button>Read books</button></NavLink></div>
      <div className={s.planned_books}><NavLink to={'/profile/'+ props.id + '/planned_books'}><button>Planned books</button></NavLink></div>
    </div>
  )
}

export default UsersInfo;
