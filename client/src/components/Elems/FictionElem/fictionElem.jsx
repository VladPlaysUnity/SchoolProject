import s from './fictionElem.module.css'
import {NavLink} from "react-router-dom";

const FictionElem = (props) =>{
  let fictionLink = '';
  let author_or_director = ''
  fictionLink = '/fiction/' + props.iD;
  if (props.type == 'book'){  
    author_or_director = <p><b>Author:</b> {props.info.author}</p>
  } else if (props.type == 'film'){
    author_or_director = <p><b>Director:</b> {props.info.director}</p>
  }
  return (
    <div className={s.fictionElem}>
      <div className={s.coverPhoto}><img src={props.info.coverPhoto} /></div>
      <div className={s.details}>
        <h3>{props.info.name}</h3>
        <p><b>Genre:</b> {props.info.genre}</p>
        {author_or_director}
        <p><b>Date of release:</b> {props.info.releaseDate}</p>
        <p><b>Description:</b> {props.info.description}</p>
      </div>
      <div className={s.rating}>Rating:<br />{props.overallRating}</div>
      <div className={s.link_button}><NavLink to={fictionLink}><button>Look!</button></NavLink></div>
    </div>
  )
}

export default FictionElem;
