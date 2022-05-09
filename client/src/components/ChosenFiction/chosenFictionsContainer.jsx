import {getAllFictions, getRatingOfFictionFromUser, getOverallRatingOfFiction} from './../../DataBase/Fictions.js'
import {getUsersFriends, getFictionAtUser} from './../../DataBase/Users.js'
import {getFictionsComments} from './../../DataBase/Comments.js'
import {getLoggedInStatus, getLoggedUserId} from './../../LocalInfo/localInfo.js'
import {changeUsersRatingOfFictionActionCreator, changeUsersStatusOfFictionActionCreator, addCommentActionCreator} from './../../redux/reducers/chosenFictionReducer.js'
import {Routes, Route} from "react-router-dom";
import {useState, useEffect} from 'react';
import ChosenFiction from './chosenFiction.jsx'

const ChosenFictionsContainer = (props) =>{

  const [fictions, setFictions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    let fictionPromise = getAllFictions()
    .then((result)=>{
      setIsLoaded(true);
      setFictions(result)
    })

  })

  if(error){
    return <Routes></Routes>
  } else if(!isLoaded){
    return <Routes>Loading</Routes>
  }else if(isLoaded){
    let fictionLinks = fictions.map((fiction)=>{
    let link = ''
    if (fiction.type == 'book'){
      link = '/bookCatalog/' + fiction.iD;
    } else if (fiction.type == 'film'){
      link = '/filmCatalog/' + fiction.iD;
    }

    let view = ''
    if (getLoggedInStatus()){
      view = 'loggedInUsersView';
    }else{
      view = 'notLoggedInUsersView';
    }

    let changeUsersRatingOfFiction = (rating) =>{
      props.dispatch(changeUsersRatingOfFictionActionCreator(fiction.iD, getLoggedUserId(), rating))
    }
    let changeUsersStatusOfFiction = (status) =>{
      props.dispatch(changeUsersStatusOfFictionActionCreator(getLoggedUserId(), fiction.iD, status))
    }


    let fictionAtFriends = []
    //let friendsOfUser = getUsersFriends(getLoggedUserId())
    //for (var i = 0; i < friendsOfUser.length; i++) {
    //  fictionAtFriends.push({iD:friendsOfUser[i].iD, name:friendsOfUser[i].usersInfo.name, status:getFictionAtUser(fiction.iD, friendsOfUser[i].iD)})
    //}

    let addComment = (content) =>{
      props.dispatch(addCommentActionCreator(getLoggedUserId(),fiction.iD, content))
    }

    return (<ChosenFiction fiction={fiction} loggedIn={getLoggedInStatus()}
              usersStatus='not completed'
              usersRating={5}
              overallRating={6}
              comments={[]}
              fictionAtFriends={fictionAtFriends} addComment={addComment}
              changeUsersRatingOfFiction={changeUsersRatingOfFiction}
              changeUsersStatusOfFiction={changeUsersStatusOfFiction}
              view={view} dispatch={props.dispatch}/>)
  })

  return (
    <Routes>
      {fictionLinks}
    </Routes>
  );
  }
}

export default ChosenFictionsContainer;
