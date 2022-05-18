import s from './commentsContainer.module.css'
import {changeLikeOrDislikeOfCommentActionCreator} from './../../redux/reducers/profileReducer.js'
import {getLoggedInStatus, getLoggedUserId} from './../../LocalInfo/localInfo.js'
import {getUsersComments, getStatusOfCommentFromUser} from './../../DataBase/Comments.js'
import CommentBlock from './Comment/comment.jsx'

const CommentsContainer= (props)=>{

  let comments = props.comments.map((comment)=>{
    return <CommentBlock comment={comment} loggedUser={getLoggedUserId()} loggedIn={getLoggedInStatus()} like_or_dislike={props.like_or_dislike}/>
  })

  if(false){
    return (
      <div>
        Loading...
      </div>
    )
  } else if(true){
    return (
      <div className={s.comments}>
        {comments}
      </div>
    )
  }

}

export default CommentsContainer;
