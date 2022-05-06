import s from './chosenBook.module.css';
import CommentBlock from '../Comment/comment.jsx';
import React from 'react';
import AtFriends from './../AtFriends/atFriends.jsx';
import {addCommentActionCreator} from './../../redux/reducers/commentsR';

const ChosenBook = (props)=>{
  let neededComments = [];
  for (let i=0; i<props.comments.length; i+=1){
    if (props.comments[props.comments.length-1-i].staticInfo.place == props.info.name){
      neededComments.push(props.comments[props.comments.length-1-i])
    }
  };

  let comments = neededComments.map((comment)=>{
      return (<CommentBlock dispatch={props.dispatch} id={comment.id} staticInfo={comment.staticInfo} dynamicInfo={comment.dynamicInfo}/>)
   });

  let sendMessage = ()=>{
    props.dispatch(addCommentActionCreator(props.info.name, newCommentElement.current.value,props.loggedUser.id))
  };

  let newCommentElement = React.createRef();

  return(
    <div className={s.chosenBook}>
      <div className={s.name}>{props.info.name}</div>

      <div className={s.book}>
          <div className={s.bookCover}><img src={props.info.bookCover} alt="img" /></div>
          <div className={s.status}>
            <select id="status" name="status">
              <option value="read">Read</option>
              <option value="planned">Planned</option>
              <option value="reading">Reading</option>
              <option value="not_read">Not read</option>
            </select>
          </div>
      </div>

      <div className={s.details}>
          <div className={s.leftPart}>
            <p><b>Author</b>: {props.info.author}</p>
            <p><b>Genre</b>: {props.info.genre}</p>
          </div>

          <div className={s.rightPart}>
            <div className={s.overallRating}><b>Overall rating</b> : 9/10</div>
            <div className={s.usersRating}><b>User's rating</b> : <input type="text" /> /10</div>
          </div>

          <div className={s.about}>
            <p><b>About book</b>: {props.info.aboutBook}</p>
          </div>
      </div>

      <div className={s.lowerPart}>
        <div className={s.link_to_download}>Link to download</div>

        <AtFriends type='Book' />

        <div className={s.comment_section}>
          <textarea ref={newCommentElement} placeholder="Write your comment here"></textarea>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      <div className={s.comments}>
        <b>Other comments</b>
        {comments}
      </div>
    </div>
  );
}

export default ChosenBook;
