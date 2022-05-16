import s from './atFollowed.module.css'
import {NavLink} from 'react-router-dom'

const AtFollowed = (props) => {
  //console.log(props.fictionAtFollowed);
  let followedElems = props.fictionAtFollowed.map((friend)=>{
    return (
      <div className={s.friendElem}>
        <NavLink to={'/profile/' + friend.iD}><div>{friend.name}</div></NavLink>
        <div>{friend.status}</div>
      </div>)
  })

  return(
    <div className={s.at_friends}>
      <div>Fiction at followed</div>
      <div className={s.list_of_friends}>
        {followedElems}
      </div>
      <div className={s.pagesNButtons}>
        <button>Back</button>
        <div>1/1</div>
        <button>Forward</button>
      </div>
    </div>
  )
}

export default AtFollowed;
