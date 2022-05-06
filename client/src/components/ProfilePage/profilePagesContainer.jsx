import ProfilePage from './profile.jsx';
import {getAllUsers, getUsersFriends, getUserById, isFriend} from './../../DataBase/Users.js'
import {getFictionById} from './../../DataBase/Fictions.js'
import {getUsersComments} from './../../DataBase/Comments.js'
import {getLoggedUserId, getLoggedInStatus} from './../../LocalInfo/localInfo.js'
import {addUserAsFriendActionCreator, removeUserFromFriendlistActionCreator} from './../../redux/reducers/profileReducer.js'
import {Routes, Route} from "react-router-dom";
import CatalogPage from './../Catalog/catalog.jsx'

const ProfilePagesContainer = (props) =>{


  let userLinks = getAllUsers().map((user)=>{
    let link = '/profile/' + user.id;
    let type = 'nobodyIsLoggedIn'
    if (getLoggedInStatus()){
      if (user.id == getLoggedUserId()) {
        type = 'loggedUsersProfile';
      } else{
        type = 'notLoggedUsersProfile';
      }
    }

    let planned_films = []
    let watched_films = []
    let planned_books = []
    let read_books = []
    for (let i = 0; i < user.markedFictions.length; i++){
      if (user.markedFictions[i].status == 'completed'){
        let f = getFictionById(user.markedFictions[i].fiction_id)
        if (f.type == 'book'){
          read_books.push(f)
        } else if (f.type == 'film') {
          watched_films.push(f)
        }
      } else if (user.markedFictions[i].status == 'planned') {
        let f = getFictionById(user.markedFictions[i].fiction_id)
        if (f.type == 'book'){
          planned_books.push(f)
        } else if (f.type == 'film') {
          planned_films.push(f)
        }
      }
    }


    let addFriend = (friend_id) =>{
      props.dispatch(addUserAsFriendActionCreator(getLoggedUserId(), friend_id))
    }
    let removeFriend = (friend_id) =>{
      props.dispatch(removeUserFromFriendlistActionCreator(getLoggedUserId(), friend_id))
    }

    return (<><Route path={link}
                        element={<ProfilePage dispatch={props.dispatch}
                        info={user.usersInfo} id={user.id}
                        isFriend={isFriend(getLoggedUserId(), user.id)}
                        friends={getUsersFriends(user.id)}
                        addFriend={addFriend} removeFriend={removeFriend}
                        comments={getUsersComments(user.id)} type={type}/>}/>
            <Route path={link+'/planned_films'}
                   element={<CatalogPage type='film' elems={planned_films}/>}/>
            <Route path={link+'/watched_films'}
                   element={<CatalogPage type='film' elems={watched_films}/>}/>
            <Route path={link+'/planned_books'}
                   element={<CatalogPage type='book' elems={planned_books}/>}/>
            <Route path={link+'/read_books'}
                   element={<CatalogPage type='book' elems={read_books}/>}/>
            </>)
  })




  return (
    <Routes>
      {userLinks}
    </Routes>
  );
}

export default ProfilePagesContainer;
