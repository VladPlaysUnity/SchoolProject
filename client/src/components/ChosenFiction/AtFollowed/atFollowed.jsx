import s from './atFollowed.module.css'
import { getFictionAtUser, getUsersFollowedPeople } from './../../../DataBase/Users.js'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const AtFollowed = (props) => {
  const [fictionAtFollowed, setFictionAtFollowed] = useState([])
  const [amountOfPages, setPages] = useState(1)
  const [page, setPage] = useState(0)
  const [followedElems, setFollowedElems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  const params = useParams()

  useEffect(()=>{
    getUsersFollowedPeople(props.userID)
    .then((people)=>{
      setPages((people.length%6 == 0) ? people.length/6 : (people.length-(people.length%6))/6+1)
      let k = ''
      let miniPromises = []
      for (let i = 0; i < people.length; i++) {
        k = getFictionAtUser(people[i].iD, params.iD)
        .then((status)=>{
          let d = {iD:people[i].iD, profilePhoto: people[i].usersInfo.profilePhoto, name:people[i].usersInfo.name, status:status}
          return d
        })
        miniPromises.push(k)
      }
       Promise.all(miniPromises)
       .then((data)=>{
         setFictionAtFollowed(data)
         setFollowedElems(data.slice((page)*6, (page)*6 + 6).map((f)=>{ //
          let link_to_friend = '/profile/' + f.iD
          let stat_class = ''
          switch (f.status) {
            case 'completed':
              stat_class = s.completed
              break;
            case 'in progress':
              stat_class= s.in_progress
              break;
            case 'planned':
              stat_class = s.planned
              break;
            case 'dropped':
              stat_class = s.dropped
              break;
            case 'not completed':
              stat_class = s.not_completed
              break;
            default:
              return
          }
          return (
            <NavLink to={link_to_friend}>
            <div className={s.friendElem}>
              <div><img src={(f.profilePhoto!='')?f.profilePhoto:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=170667a&w=0&h=FXkT-N6vISLOCUefa9MyQg0pH-6loMX9zBZjgLK458c="}/></div>
              <div>{f.name}</div>
              <div className={stat_class+" " + s.status}><span>{f.status}</span></div>
            </div>
            </NavLink>)
        }))
        setIsLoaded(true)
       })
    }, (error)=>{
      setError(error)
    })
 }, [params])

 let forward = ()=>{
   if (page < amountOfPages-1){
     setPage(page+1)
     console.log(fictionAtFollowed);
     setFollowedElems(fictionAtFollowed.slice((page+1)*6, (page+1)*6 + 6).map((f)=>{ //
      let link_to_friend = '/profile/' + f.iD
      let stat_class = ''
      switch (f.status) {
        case 'completed':
          stat_class = s.completed
          break;
        case 'in progress':
          stat_class= s.in_progress
          break;
        case 'planned':
          stat_class = s.planned
          break;
        case 'dropped':
          stat_class = s.dropped
          break;
        case 'not completed':
          stat_class = s.not_completed
          break;
        default:
          return
      }
      return (
        <NavLink to={link_to_friend}>
        <div className={s.friendElem}>
          <div><img src={(f.profilePhoto!='')?f.profilePhoto:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=170667a&w=0&h=FXkT-N6vISLOCUefa9MyQg0pH-6loMX9zBZjgLK458c="}/></div>
          <div>{f.name}</div>
          <div className={stat_class+" " + s.status}><span>{f.status}</span></div>
        </div>
        </NavLink>)
    }))
   }
 }
 let back = ()=>{
   if (page > 0){
     setPage(page-1)
     setFollowedElems(fictionAtFollowed.slice((page-1)*6, (page-1)*6 + 6).map((f)=>{ //
      let link_to_friend = '/profile/' + f.iD
      let stat_class = ''
      switch (f.status) {
        case 'completed':
          stat_class = s.completed
          break;
        case 'in progress':
          stat_class= s.in_progress
          break;
        case 'planned':
          stat_class = s.planned
          break;
        case 'dropped':
          stat_class = s.dropped
          break;
        case 'not completed':
          stat_class = s.not_completed
          break;
        default:
          return
      }
      return (
        <NavLink to={link_to_friend}>
        <div className={s.friendElem}>
          <div><img src={(f.profilePhoto!='')?f.profilePhoto:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=170667a&w=0&h=FXkT-N6vISLOCUefa9MyQg0pH-6loMX9zBZjgLK458c="}/></div>
          <div>{f.name}</div>
          <div className={stat_class+" " + s.status}><span>{f.status}</span></div>
        </div>
        </NavLink>)
    }))
   }
 }

 if (error){
   return (
     <div className={s.at_friends}>
       <div>Fiction at followed</div>
       <div className={s.list_of_friends}>
         Error: {error.message}
       </div>
       <div className={s.pagesNButtons}>
           <button onClick={back}>Back</button>
           <div>{page+1}/{amountOfPages}</div>
           <button onClick={forward}>Forward</button>
       </div>

   </div>
   )
 } else if (!isLoaded) {
   return (
     <div className={s.at_friends}>
       <div className={s.n}>Fiction at followed</div>
       <div className={s.list_of_friends}>
         Loading...
       </div>
       <div className={s.pagesNButtons}>
           <button className={s.butt1} onClick={back}>Back</button>
           <div>{page+1}/{amountOfPages}</div>
           <button className={s.butt1} onClick={forward}>Forward</button>
       </div>

   </div>
   )
 } else if (isLoaded) {
   return (
     <div className={s.at_friends}>
       <div className={s.n}>Fiction at followed</div>
       <div className={s.list_of_friends}>
         {followedElems}
       </div>
       <div className={s.pagesNButtons}>
         <button className={s.butt1} onClick={back}>Back</button>
         <div>{(amountOfPages == 0)? page: page+1}/{amountOfPages}</div>
         <button className={s.butt1} onClick={forward}>Forward</button>
       </div>
     </div>
   )
 }

}

export default AtFollowed;
