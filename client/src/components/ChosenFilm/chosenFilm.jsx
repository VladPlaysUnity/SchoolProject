import s from './chosenFilm.module.css';
import CommentBlock from '../Comment/comment.jsx';
import React from 'react';
import AtFriends from './../AtFriends/atFriends.jsx';
import {addCommentActionCreator} from './../../redux/reducers/commentsR';

const ChosenFilm = (props)=>{
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
    props.dispatch(addCommentActionCreator(props.info.name, newCommentElement.current.value,'Me'))
  };

  let newCommentElement = React.createRef();

  return(
    <div className={s.chosenFilm}>
      <div className={s.name}>{props.info.name}</div>

      <div className={s.film}>
          <div className={s.filmImg}><img src={props.info.filmCover} alt="img" /></div>
          <div className={s.status}>
            <select id="status" name="status">
              <option value="watched">Watched</option>
              <option value="planned">Planned</option>
              <option value="watching">Watching</option>
              <option value="not_watched">Not watched</option>
            </select>
          </div>
      </div>

      <div className={s.details}>
          <div className={s.leftPart}>
            <p><b>Director</b>: {props.info.director}</p>
            <p><b>Genre</b>: {props.info.genre}</p>
          </div>

          <div className={s.rightPart}>
            <div className={s.overallRating}><b>Overall rating</b> : 9/10</div>
            <div className={s.usersRating}><b>User's rating</b> : <input type="text" /> /10</div>
          </div>

          <div className={s.about}>
            <p><b>About film</b>: {props.info.aboutFilm}</p>
          </div>
      </div>

      <div className={s.lowerPart}>
        <div className={s.link_to_download}>Link to download</div>

        <AtFriends type='Film' />

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

export default ChosenFilm;
