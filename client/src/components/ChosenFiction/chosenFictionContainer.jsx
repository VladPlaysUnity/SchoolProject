import { getFictionById, getAllFictions, getRatingOfFictionFromUser, getOverallRatingOfFiction } from './../../DataBase/Fictions.js'
import { getUsersFriends, getFictionAtUser } from './../../DataBase/Users.js'
import { getFictionsComments } from './../../DataBase/Comments.js'
import { getLoggedInStatus } from './../../LocalInfo/localInfo.js'
import { changeUsersRatingOfFictionActionCreator, changeUsersStatusOfFictionActionCreator, addCommentActionCreator } from './../../redux/reducers/chosenFictionReducer.js'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import ChosenFiction from './chosenFiction.jsx'

const ChosenFictionContainer = (props) =>{
  const [fiction, setFiction] = useState([]);
  const [userRating, setUserRating] = useState(0)
  const [userStatus, setUserStatus] = useState('not completed')
  const [overallRating, setOverallRating] = useState(0)
  const params = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
   let fP = getFictionById(params.iD)
   let oRP = getOverallRatingOfFiction(params.iD)
   let rP = ''
   let uS = ''
   if (getLoggedInStatus()){
     rP = getRatingOfFictionFromUser(params.iD, props.loggedUser)
     uS = getFictionAtUser(props.loggedUser, params.iD)
   }

   if (getLoggedInStatus()){
     Promise.all([fP, rP, oRP, uS])
     .then((result)=>{
       setFiction(result[0])
       setOverallRating(result[2])
       setUserRating(result[1])
       setUserStatus(result[3])
       setIsLoaded(true)
     })
   } else{
     Promise.all([fP, oRP])
     .then((result)=>{
       setFiction(result[0])
       setOverallRating(result[1])
       setIsLoaded(true)
     })}
 }, [props.loggedUser,params.iD]);

 let view = ''
 if (getLoggedInStatus()){
   view = 'loggedInUsersView';
 }else{
   view = 'notLoggedInUsersView';
 }

 let changeUsersRatingOfFiction = (rating) =>{
   props.dispatch(changeUsersRatingOfFictionActionCreator(params.iD, props.loggedUser, rating))
   setUserRating(rating)
 }
 let changeUsersStatusOfFiction = (status) =>{
   props.dispatch(changeUsersStatusOfFictionActionCreator(props.loggedUser, params.iD, status))
   setUserStatus(status)
 }

 let fictionAtFriends = []
 //let friendsOfUser = getUsersFriends(props.loggedUser)
 //for (var i = 0; i < friendsOfUser.length; i++) {
 //  fictionAtFriends.push({iD:friendsOfUser[i].iD, name:friendsOfUser[i].usersInfo.name, status:getFictionAtUser(fiction.iD, friendsOfUser[i].iD)})
 //}

 let addComment = (content) =>{
   //props.dispatch(addCommentActionCreator(props.loggedUser,fiction.iD, content))
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
      <ChosenFiction fiction={fiction}
                usersStatus={userStatus}
                usersRating={userRating}
                overallRating={overallRating}
                comments={[]}
                fictionAtFriends={fictionAtFriends} addComment={addComment}
                changeUsersRatingOfFiction={changeUsersRatingOfFiction}
                changeUsersStatusOfFiction={changeUsersStatusOfFiction}
                view={view} dispatch={props.dispatch}/>
      </div>
    )
  }
}

export default ChosenFictionContainer;
