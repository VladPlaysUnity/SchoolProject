import s from './comment.module.css'
import {getFictionById} from './../../../DataBase/Fictions.js'
import {getUserById} from './../../../DataBase/Users.js'
import {getStatusOfCommentFromUser} from './../../../DataBase/Comments.js'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const CommentBlock = (props)=>{
  const [author, setAuthor] = useState('')
  const [place, setPlace] = useState('')
  const [status, setStatus] = useState(0)
  const [lND, setLND] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(()=>{
    let fic = getFictionById(parseInt(props.comment.staticInfo.place))
    .then((f)=>f.info.name)
    let aut = getUserById(parseInt(props.comment.staticInfo.author))
    .then((u)=>u.usersInfo.name)
    let stat = props.loggedIn? getStatusOfCommentFromUser(props.comment.iD, props.loggedUser):0
    Promise.all([fic, aut, stat])
    .then((res)=>{
      setPlace(res[0])
      setAuthor(res[1])
      setStatus(res[2])
      if (props.loggedIn){

        let lb = ''
        let db = ''
        if (res[2]=="like"){
          db = s.b2
          lb = s.b2 + " " + s.green
        } else if (res[2]=="dislike") {
          lb = s.b2
          db = s.b2 + " " + s.red
        } else{
          lb = s.b2
          db = s.b2
        }

        setLND(<div className={s.likesAndDislikes}>
                        <button className={lb} onClick={like}>Like!</button>
                        <div>{rating}</div>
                        <button className={db} onClick={dislike}>Dislike!</button>
                      </div>)
      } else{
        setLND( <div className={s.likesAndDislikes}>
                        <div></div>
                        <div>{rating}</div>
                        <div></div>
                      </div>)
      }
      setIsLoaded(true)
    })
  }, [props.comment])

  let rating = parseInt(props.comment.dynamicInfo.likes.length) - parseInt(props.comment.dynamicInfo.dislikes.length)

  let like = () =>{
    props.like_or_dislike(props.comment.iD, 'like')
    if (status == 'like'){
      setStatus('0')
      setLND(<div className={s.likesAndDislikes}>
                      <button className={s.b2} onClick={like}>Like!</button>
                      <div>{rating}</div>
                      <button className={s.b2} onClick={dislike}>Dislike!</button>
                    </div>)
    }else if (status == 'dislike') {
      setStatus('like')
      setLND(<div className={s.likesAndDislikes}>
                      <button className={s.b2 + " " + s.green} onClick={like}>Like!</button>
                      <div>{rating}</div>
                      <button className={s.b2} onClick={dislike}>Dislike!</button>
                    </div>)
    } else{
      setStatus('like')
      setLND(<div className={s.likesAndDislikes}>
                      <button className={s.b2 + " " + s.green} onClick={like}>Like!</button>
                      <div>{rating}</div>
                      <button className={s.b2} onClick={dislike}>Dislike!</button>
                    </div>)
    }

  }
  let dislike = () =>{
    props.like_or_dislike(props.comment.iD, 'dislike')
    setStatus('dislike')

    if (status == 'dislike'){
      setStatus('0')
      setLND(<div className={s.likesAndDislikes}>
                      <button className={s.b2} onClick={like}>Like!</button>
                      <div>{rating}</div>
                      <button className={s.b2} onClick={dislike}>Dislike!</button>
                    </div>)
    }else if (status == 'like') {
      setStatus('dislike')
      setLND(<div className={s.likesAndDislikes}>
                      <button className={s.b2} onClick={like}>Like!</button>
                      <div>{rating}</div>
                      <button className={s.b2 + " " + s.red} onClick={dislike}>Dislike!</button>
                    </div>)
    } else{
      setStatus('dislike')
      setLND(<div className={s.likesAndDislikes}>
                      <button className={s.b2} onClick={like}>Like!</button>
                      <div>{rating}</div>
                      <button className={s.b2 + " " + s.red} onClick={dislike}>Dislike!</button>
                    </div>)
    }
  }

  if(isLoaded){
    return (
      <div className={s.commentBlock}>
        <div className={s.names}>
          <NavLink to={'/profile/' +props.comment.staticInfo.author}><div className={s.user}>{author}</div></NavLink>
          <div></div>
          <NavLink to={'/fiction/'+ props.comment.staticInfo.place}><div className={s.placeName}>{place}</div></NavLink>
        </div>
        <div className={s.commentText}>{props.comment.staticInfo.content}</div>
        {lND}
      </div>
    )
  } else{
    return <div>Loading</div>
  }
}

export default CommentBlock;
