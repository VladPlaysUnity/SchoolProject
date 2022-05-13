import ProfilePage from './profile.jsx';
import {getAllUsers, getUsersFriends, getUserById, isFriend} from './../../DataBase/Users.js'
import {getFictionById} from './../../DataBase/Fictions.js'
import {getUsersComments} from './../../DataBase/Comments.js'
import {} from './../../LocalInfo/localInfo.js'
import {addUserAsFriendActionCreator, removeUserFromFriendlistActionCreator} from './../../redux/reducers/profileReducer.js'
import CatalogPage from './../Catalog/catalog.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProfilePageContainer = (props) =>{
  const [user, setUser] = useState({})
  const [view, setView] = useState('nobodyIsLoggedIn')
  const [isUserFriend, setIsUserFriend] = useState(false)
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
          isFriend(props.loggedUser, params.iD)
          .then((iF)=>{
            setUser(res)
            setIsUserFriend(iF)
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
  }, [props.loggedUser, params.iD])


  let addFriend = (friend_id) =>{
    //props.dispatch(addUserAsFriendActionCreator(props.loggedUser, friend_id))
  }
  let removeFriend = (friend_id) =>{
    //props.dispatch(removeUserFromFriendlistActionCreator(props.loggedUser, friend_id))
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
      info={user.usersInfo} iD={user.iD}
      isFriend={isUserFriend}
      friends={[]}
      addFriend={addFriend} removeFriend={removeFriend}
      comments={[]} view={view}/>
      </div>
    )
  }
}

export default ProfilePageContainer;
