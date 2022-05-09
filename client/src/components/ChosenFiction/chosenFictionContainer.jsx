import {getFictionById, getAllFictions, getRatingOfFictionFromUser, getOverallRatingOfFiction} from './../../DataBase/Fictions.js'
import {getUsersFriends, getFictionAtUser} from './../../DataBase/Users.js'
import {getFictionsComments} from './../../DataBase/Comments.js'
import {getLoggedInStatus, getLoggedUserId} from './../../LocalInfo/localInfo.js'
import {changeUsersRatingOfFictionActionCreator, changeUsersStatusOfFictionActionCreator, addCommentActionCreator} from './../../redux/reducers/chosenFictionReducer.js'
import {Routes, Route, useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import ChosenFiction from './chosenFiction.jsx'

const ChosenFictionContainer = (props) =>{
  const [fiction, setFiction] = useState([]);
 const params = useParams();
 const [error, setError] = useState(null);
 const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
   getFictionById(params.iD)
   .then((result)=>{
     setFiction(result)
     setIsLoaded(true)
   })
 }, []);

 let view = ''
 if (getLoggedInStatus()){
   view = 'loggedInUsersView';
 }else{
   view = 'notLoggedInUsersView';
 }

 let changeUsersRatingOfFiction = (rating) =>{
   //props.dispatch(changeUsersRatingOfFictionActionCreator(iD, getLoggedUserId(), rating))
 }
 let changeUsersStatusOfFiction = (status) =>{
   //props.dispatch(changeUsersStatusOfFictionActionCreator(getLoggedUserId(), iD, status))
 }

 let fictionAtFriends = []
 //let friendsOfUser = getUsersFriends(getLoggedUserId())
 //for (var i = 0; i < friendsOfUser.length; i++) {
 //  fictionAtFriends.push({iD:friendsOfUser[i].iD, name:friendsOfUser[i].usersInfo.name, status:getFictionAtUser(fiction.iD, friendsOfUser[i].iD)})
 //}

 let addComment = (content) =>{
   //props.dispatch(addCommentActionCreator(getLoggedUserId(),fiction.iD, content))
 }


  if (error){
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else if (isLoaded) {
    if(!fiction){
      return <div>Fiction not found</div>
    }
    return(
      <div>
      <ChosenFiction fiction={fiction} loggedIn={getLoggedInStatus()}
                usersStatus='not completed'
                usersRating={5}
                overallRating={6}
                comments={[]}
                fictionAtFriends={fictionAtFriends} addComment={addComment}
                changeUsersRatingOfFiction={changeUsersRatingOfFiction}
                changeUsersStatusOfFiction={changeUsersStatusOfFiction}
                view={view} dispatch={props.dispatch}/>
      </div>
    )
  }
  return(
    <div>
      {params.iD}
    </div>
  )
}

export default ChosenFictionContainer;
