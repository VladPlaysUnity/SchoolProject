import s from './comment.module.css'

const CommentBlock = (props)=>{

  let rating = parseInt(props.comment.dynamicInfo.likes.length) - parseInt(props.comment.dynamicInfo.dislikes.length)

  let like = () =>{
    props.like_or_dislike(props.comment.id, 'like')
  }
  let dislike = () =>{
    props.like_or_dislike(props.comment.id, 'dislike')
  }

  let lAndD = <div></div>

  if (props.loggedIn){
    lAndD =  <div className={s.likesAndDislikes}>
                    <button onClick={like}>Like!</button>
                    <div>{rating}</div>
                    <button onClick={dislike}>Dislike!</button>
                  </div>
  } else{
    lAndD =  <div className={s.likesAndDislikes}>
                    <div></div>
                    <div>{rating}</div>
                    <div></div>
                  </div>
  }

  return (
    <div className={s.commentBlock}>
      <div className={s.names}>
        <div className={s.user}>{props.comment.staticInfo.author}</div>
        <div className={s.placeName} >{props.comment.staticInfo.place}</div>
      </div>
      <div className={s.commentText}>{props.comment.staticInfo.content}</div>
      {lAndD}
    </div>
  )
}

export default CommentBlock;
