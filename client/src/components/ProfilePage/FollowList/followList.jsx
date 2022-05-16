import s from './followList.module.css'
import {NavLink, useNavigate} from "react-router-dom";

const FollowList = (props) =>{

  const navigate = useNavigate()

  let lff_b = ''
  if (props.view == 'loggedUsersProfile'){
    lff_b = <button onClick={()=>navigate('/catalog/allUsers')}>Look for friends!</button>
  } else {
    lff_b = <div></div>
  }

  let followedElems = props.followedPeople.map((f)=>{
    let link_to_friend = '/profile/' + f.iD
    return (
      <NavLink to={link_to_friend}>
      <div className={s.friendElem}>
        <div><img src={f.usersInfo.profilePhoto}/></div>
        <div>{f.usersInfo.name}</div>
      </div>
      </NavLink>)
  })

  return (
    <div className={s.friend_list}>
      <div>Followlist</div>
      <div className={s.list_of_friends}>
        {followedElems}
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

export default FollowList;
