import s from './followList.module.css'
import { getUsersFollowedPeople } from './../../../DataBase/Users.js'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

let arr = [{usersInfo:{profilePhoto:'', name:'Bob'}},{usersInfo:{profilePhoto:'', name:'Bob'}},{usersInfo:{profilePhoto:'', name:'Bob'}},{usersInfo:{profilePhoto:'', name:'Bob'}},{usersInfo:{profilePhoto:'', name:'Bob'}},{usersInfo:{profilePhoto:'', name:'Bob'}},{usersInfo:{profilePhoto:'', name:'Bob'}},{usersInfo:{profilePhoto:'', name:'Bob'}}]


const FollowList = (props) =>{
  const [followedPeople, setFollowedPeople] = useState([])
  const [amountOfPages, setPages] = useState(1)
  const [page, setPage] = useState(0)
  const [followedElems, setFollowedElems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(()=>{
    getUsersFollowedPeople(params.iD)
    .then((people)=>{
      setFollowedPeople(people)
      setPages((people.length%6 == 0) ? people.length/6 : (people.length-(people.length%6))/6+1)
      setFollowedElems(people.slice((page)*6, (page)*6 + 6).map((f)=>{ //
       let link_to_friend = '/profile/' + f.iD
       return (
         <NavLink to={link_to_friend}>
         <div className={s.friendElem}>
           <div><img src={(f.usersInfo.profilePhoto!='')?f.usersInfo.profilePhoto:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=170667a&w=0&h=FXkT-N6vISLOCUefa9MyQg0pH-6loMX9zBZjgLK458c="}/></div>
           <div>{f.usersInfo.name}</div>
         </div>
         </NavLink>)
     }))
      setIsLoaded(true)
    }, (error)=>{
      setError(error)
    })
 }, [params])

  let lff_b = ''
  if (props.view == 'loggedUsersProfile'){
    lff_b = <button className={s.butt1} onClick={()=>navigate('/catalog/allUsers')}>Look for people!</button>
  } else {
    lff_b = <div></div>
  }

  let forward = ()=>{
    if (page < amountOfPages-1){
      setPage(page+1)
      setFollowedElems(followedPeople.slice((page+1)*6, (page+1)*6 + 6).map((f)=>{ //
       let link_to_friend = '/profile/' + f.iD
       return (
         <NavLink to={link_to_friend}>
         <div className={s.friendElem}>
           <div><img src={(f.usersInfo.profilePhoto!='')?f.usersInfo.profilePhoto:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=170667a&w=0&h=FXkT-N6vISLOCUefa9MyQg0pH-6loMX9zBZjgLK458c="}/></div>
           <div>{f.usersInfo.name}</div>
         </div>
         </NavLink>)
     }))
    }
  }
  let back = ()=>{
    if (page > 0){
      setPage(page-1)
      setFollowedElems(followedPeople.slice((page-1)*6, (page-1)*6 + 6).map((f)=>{ //
       let link_to_friend = '/profile/' + f.iD
       return (
         <NavLink to={link_to_friend}>
         <div className={s.friendElem}>
           <div><img src={(f.usersInfo.profilePhoto!='')?f.usersInfo.profilePhoto:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=170667a&w=0&h=FXkT-N6vISLOCUefa9MyQg0pH-6loMX9zBZjgLK458c="}/></div>
           <div>{f.usersInfo.name}</div>
         </div>
         </NavLink>)
     }))
    }
  }



  if (error){
    return (
      <div className={s.friend_list}>
        <div className={s.n}>Followlist</div>
        <div className={s.list_of_friends}>
          Error: {error.message}
        </div>
        <div className={s.pagesNButtons}>
          <div className={s.butt1} className={s.bf}>
            <button onClick={back}>Back</button>
            <div>{page+1}/{amountOfPages}</div>
            <button onClick={forward}>Forward</button>
          </div>
          <div className={s.butt1} className={s.lff}>{lff_b}</div>
        </div>

    </div>
    )
  } else if (!isLoaded) {
    return (
      <div className={s.friend_list}>
        <div className={s.n}>Followlist</div>
        <div className={s.list_of_friends}>
          Loading...
        </div>
        <div className={s.pagesNButtons}>
          <div className={s.bf}>
            <button className={s.butt1} onClick={back}>Back</button>
            <div>{page+1}/{amountOfPages}</div>
            <button className={s.butt1} onClick={forward}>Forward</button>
          </div>
          <div className={s.lff}>{lff_b}</div>
        </div>

    </div>
    )
  } else if (isLoaded) {
    return (
      <div className={s.friend_list}>
        <div className={s.n}>Followlist</div>
        <div className={s.list_of_friends}>
          {followedElems}
        </div>
        <div className={s.pagesNButtons}>
          <div className={s.bf}>
            <button className={s.butt1} onClick={back}>Back</button>
            <div style={{"padding-top": 10 + '%'}}>{(amountOfPages == 0)? page: page+1}/{amountOfPages}</div>
            <button className={s.butt1} onClick={forward}>Forward</button>
          </div>
          <div className={s.lff}>{lff_b}</div>
        </div>

    </div>
    )
  }
}

export default FollowList;
