import s from './friendList.module.css'
import {NavLink} from "react-router-dom";

const FriendList = (props) =>{

  let lff_b = ''
  if (props.type == 'loggedUsersProfile'){
    lff_b = <button>Look for friends!</button>
  } else {
    lff_b = <div></div>
  }

  let friendElems = props.friends.map((friend)=>{
    let link_to_friend = '/profile/' + friend.id
    return (
      <NavLink to={link_to_friend}>
      <div className={s.friendElem}>
        <div><img src={friend.usersInfo.profilePhoto}/></div>
        <div>{friend.usersInfo.name}</div>
      </div>
      </NavLink>)
  })

  return (
    <div className={s.friend_list}>
      <div>Friendlist</div>
      <div className={s.list_of_friends}>
        {friendElems}
      </div>

      <div className={s.pagesNButtons}>
        <button>Back</button>
        <div>1</div>
        <button>Forward</button>
      </div>

      <div className={s.lff}>
        <div></div>
        {lff_b}
        <div></div>
      </div>
  </div>
  );
}

export default FriendList;
