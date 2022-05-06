import {getAllFictions, getRatingOfFictionFromUser, getOverallRatingOfFiction} from './../../DataBase/Fictions.js'
import {getUsersFriends, getFictionAtUser} from './../../DataBase/Users.js'
import {getFictionsComments} from './../../DataBase/Comments.js'
import {getLoggedInStatus, getLoggedUserId} from './../../LocalInfo/localInfo.js'
import {changeUsersRatingOfFictionActionCreator, changeUsersStatusOfFictionActionCreator, addCommentActionCreator} from './../../redux/reducers/chosenFictionReducer.js'
import {Routes, Route} from "react-router-dom";
import ChosenFiction from './chosenFiction.jsx'

const ChosenFictionsContainer = (props) =>{
  let fictionLinks = getAllFictions().map((fiction)=>{

    let link = ''
    if (fiction.type == 'book'){
      link = '/bookCatalog/' + fiction.id;
    } else if (fiction.type == 'film'){
      link = '/filmCatalog/' + fiction.id;
    }

    let view = ''
    if (getLoggedInStatus()){
      view = 'loggedInUsersView';
    }else{
      view = 'notLoggedInUsersView';
    }

    let changeUsersRatingOfFiction = (rating) =>{
      props.dispatch(changeUsersRatingOfFictionActionCreator(fiction.id, getLoggedUserId(),  rating))
    }
    let changeUsersStatusOfFiction = (status) =>{
      props.dispatch(changeUsersStatusOfFictionActionCreator(getLoggedUserId(), fiction.id, status))
    }


    let fictionAtFriends = []
    let friendsOfUser = getUsersFriends(getLoggedUserId())
    for (var i = 0; i < friendsOfUser.length; i++) {
      fictionAtFriends.push({id:friendsOfUser[i].id, name:friendsOfUser[i].usersInfo.name, status:getFictionAtUser(fiction.id, friendsOfUser[i].id)})
    }

    let addComment = (content) =>{
      props.dispatch(addCommentActionCreator(getLoggedUserId(),fiction.id, content))
    }

    return (<Route path={link}
    element={<ChosenFiction fiction={fiction} loggedIn={getLoggedInStatus()}
              usersStatus={getFictionAtUser(fiction.id, getLoggedUserId())}
              usersRating={getRatingOfFictionFromUser(fiction.id, getLoggedUserId())}
              overallRating={getOverallRatingOfFiction(fiction.id)}
              comments={getFictionsComments(fiction.id)}
              fictionAtFriends={fictionAtFriends} addComment={addComment}
              changeUsersRatingOfFiction={changeUsersRatingOfFiction}
              changeUsersStatusOfFiction={changeUsersStatusOfFiction}
              view={view} dispatch={props.dispatch}/>}/>)
  })

  return (
    <Routes>
      {fictionLinks}
    </Routes>
  );
}

export default ChosenFictionsContainer;
