import s from './atFriends.module.css'
import {NavLink} from 'react-router-dom'

const AtFriends = (props) => {

  let friendElems = props.fictionAtFriends.map((friend)=>{
    return (
      <div className={s.friendElem}>
        <NavLink to={'/profile/' + friend.id}><div>{friend.name}</div></NavLink>
        <div>{friend.status}</div>
      </div>)
  })

  return(
    <div className={s.at_friends}>
      <div>Fiction at friends</div>
      <div className={s.list_of_friends}>
        {friendElems}
      </div>
      <div className={s.pagesNButtons}>
        <button>Back</button>
        <div>1/1</div>
        <button>Forward</button>
      </div>
    </div>
  )
}

export default AtFriends;
