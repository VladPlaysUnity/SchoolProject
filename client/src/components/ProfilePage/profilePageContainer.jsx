import ProfilePage from './profile.jsx';
import { getAllUsers, getUsersFollowedPeople, getUserById, isFollowed, followUser, unfollowUser } from './../../DataBase/Users.js'
import { getFictionById } from './../../DataBase/Fictions.js'
import { getUsersComments, likeOrDislike } from './../../DataBase/Comments.js'
import {} from './../../LocalInfo/localInfo.js'
import { addUserAsFriendActionCreator, removeUserFromFriendlistActionCreator } from './../../redux/reducers/profileReducer.js'
import CatalogPage from './../Catalog/catalog.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProfilePageContainer = (props) =>{
  const [user, setUser] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [view, setView] = useState('nobodyIsLoggedIn')
  const [followedPeople, setFollowedPeople] = useState([])
  const [comments, setComments] = useState([])
  const [isUserFollowed, setIsUserFollowed] = useState(false)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const params = useParams();

  useEffect(()=>{
    getUserById(params.iD)
    .then((res)=>{
      if (typeof props.loggedUser == 'number'){
        if (parseInt(params.iD) == props.loggedUser) {
          setView('loggedUsersProfile')
          setUser(res)
          setIsLoaded(true)
        } else{
          setView('notLoggedUsersProfile')
          isFollowed(props.loggedUser, params.iD)
          .then((iF)=>{
            setUser(res)
            setIsUserFollowed(iF)
            setIsLoaded(true)
          })
        }
      } else{
        setUser(res)
        setIsLoaded(true)
      }
    }, (error)=>{
      setError(error)
    })

    getUsersFollowedPeople(params.iD)
    .then((people)=>{
      console.log(people);
      setFollowedPeople(people)
    }, (error)=>{
      setError(error)
    })

    getUsersComments(params.iD)
    .then((comments)=>{
      setComments(comments.reverse())
    }, (error)=>{
      setError(error)
    })

  }, [props.loggedUser, params.iD, isUserFollowed, editMode])

  let like_or_dislike = (comment_id, like_or_dislike)=>{
    likeOrDislike(comment_id, props.loggedUser, like_or_dislike)
    .then((a)=>{
      getUsersComments(params.iD)
      .then((comments)=>{
        setComments(comments.reverse())
      }, (error)=>{
        setError(error)
      })
    })
  }

  let follow = (target_id) =>{
    followUser(props.loggedUser, target_id)
    .then((k)=>{
      setIsUserFollowed(true)
    })
  }
  let unfollow = (target_id) =>{
    unfollowUser(props.loggedUser, target_id)
    .then((k)=>{
      setIsUserFollowed(false)
    })
  }
  let toggleEdit = ()=>{
    setEditMode(!editMode)
  }


  async function changeProfilePhoto(photo) {
    await fetch(`http://localhost:5000/user/changeProfilePhoto/${props.loggedUser}`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({photo:photo}),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
  }


  if (error){
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else if (isLoaded) {
    if(!user){
      return <div>User not found</div>
    }
    return(
      <div>
      <ProfilePage dispatch={props.dispatch}
      info={user.usersInfo} editMode={editMode}
      iD={user.iD} togEdit={toggleEdit} changeProfilePhoto={changeProfilePhoto}
      isFollowed={isUserFollowed} like_or_dislike={like_or_dislike}
      followedPeople={followedPeople}
      followUser={follow} unfollowUser={unfollow}
      comments={comments} view={view}/>
      </div>
    )
  }
}

export default ProfilePageContainer;
