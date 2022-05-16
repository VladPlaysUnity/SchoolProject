import s from './commentsContainer.module.css'
import {changeLikeOrDislikeOfCommentActionCreator} from './../../redux/reducers/profileReducer.js'
import {getLoggedInStatus, getLoggedUserId} from './../../LocalInfo/localInfo.js'
import {getUsersComments, getStatusOfCommentFromUser} from './../../DataBase/Comments.js'
import CommentBlock from './Comment/comment.jsx'

const CommentsContainer= (props)=>{

  let comments = []
  if (getLoggedInStatus()){
    comments = props.comments.map((comment) =>{
      return <CommentBlock comment={comment} loggedIn={getLoggedInStatus()} status={getStatusOfCommentFromUser(getLoggedUserId(), comment.iD)} like_or_dislike={props.like_or_dislike}/>
  })} else{
    comments = props.comments.map((comment) =>{
      return <CommentBlock comment={comment} loggedIn={getLoggedInStatus()} />
  })}


  return (
    <div className={s.comments}>
      {comments}
    </div>
  )
}

export default CommentsContainer;
