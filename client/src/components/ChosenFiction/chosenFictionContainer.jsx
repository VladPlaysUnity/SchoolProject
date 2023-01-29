import { getFictionById, getAllFictions, getRatingOfFictionFromUser, getOverallRatingOfFiction } from './../../DataBase/Fictions.js'
import { getUsersFollowedPeople, getFictionAtUser } from './../../DataBase/Users.js'
import { getFictionsComments, likeOrDislike } from './../../DataBase/Comments.js'
import { getLoggedInStatus } from './../../LocalInfo/localInfo.js'
import { changeUsersRatingOfFictionActionCreator, changeUsersStatusOfFictionActionCreator, addCommentActionCreator } from './../../redux/reducers/chosenFictionReducer.js'
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import ChosenFiction from './chosenFiction.jsx'

const ChosenFictionContainer = (props) =>{
  const [fiction, setFiction] = useState([]);
  const [userRating, setUserRating] = useState(0)
  const [fictionAtFollowed, setFictionAtFollowed] = useState([])
  const [userStatus, setUserStatus] = useState('not completed')
  const [overallRating, setOverallRating] = useState(0)
  const [comments, setComments] = useState([])
  const params = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
   let fP = getFictionById(params.iD)
   let oRP = getOverallRatingOfFiction(params.iD)
   let commentsPromise = getFictionsComments(params.iD)
   let rP = ''
   let uS = ''
   if (getLoggedInStatus()){
     rP = getRatingOfFictionFromUser(params.iD, props.loggedUser)
     uS = getFictionAtUser(props.loggedUser, params.iD)
   }



   if (getLoggedInStatus()){
     Promise.all([fP, rP, oRP, uS, commentsPromise])
     .then((result)=>{
       setFiction(result[0])
       setOverallRating(result[2])
       setUserRating(result[1])
       setUserStatus(result[3])
       setComments(result[4].reverse())
       setIsLoaded(true)
     })
   } else{
     Promise.all([fP, oRP, commentsPromise])
     .then((result)=>{
       setFiction(result[0])
       setOverallRating(result[1])
       setComments(result[2].reverse())
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

 async function addComment(content) {
   let newComment = {place:params.iD, author:props.loggedUser, content:content}
   await fetch("http://localhost:5000/comment/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  })
  .then((a)=>{
    getFictionsComments(params.iD)
    .then((comments)=>{
      setComments(comments.reverse())
    }, (error)=>{
      setError(error)
    })
  })
  .catch(error => {
    window.alert(error);
    return;
  });
 }

 let like_or_dislike = (comment_id, like_or_dislike)=>{
   likeOrDislike(comment_id, props.loggedUser, like_or_dislike)
   .then((a)=>{
     getFictionsComments(params.iD)
     .then((comments)=>{
       setComments(comments.reverse())
     }, (error)=>{
       setError(error)
     })
   })
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
                comments={comments} like_or_dislike={like_or_dislike}
                addComment={addComment} userID={props.loggedUser}
                changeUsersRatingOfFiction={changeUsersRatingOfFiction}
                changeUsersStatusOfFiction={changeUsersStatusOfFiction}
                view={view} dispatch={props.dispatch}/>
      </div>
    )
  }
}

export default ChosenFictionContainer;
