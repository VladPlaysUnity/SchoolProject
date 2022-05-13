import s from './fictionElem.module.css'
import {NavLink} from "react-router-dom";
import {getOverallRatingOfFiction} from './../../../DataBase/Fictions.js'
import {useState, useEffect} from 'react'

const FictionElem = (props) =>{
  const [overallRating, setOverallRating] = useState(0)
  const [error, setError] = useState(null);
  const [overallRIsLoaded, setOverallRIsLoaded] = useState(false);

  useEffect(()=>{
    getOverallRatingOfFiction(props.iD)
    .then((result)=>{
      setOverallRating(result)
      setOverallRIsLoaded(true)
    })
  }, [])

  let fictionLink = '';
  let author_or_director = ''

  fictionLink = '/fiction/' + props.iD;
  if (props.type == 'book'){
    author_or_director = <p><b>Author:</b> {props.info.author}</p>
  } else if (props.type == 'film'){
    author_or_director = <p><b>Director:</b> {props.info.director}</p>
  }

  if (error){
    return <div>Error: {error.message}</div>
  }else if(!overallRIsLoaded){
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
        <div className={s.rating}>Rating:<br />Loading...</div>
        <div className={s.link_button}><NavLink to={fictionLink}><button>Look!</button></NavLink></div>
      </div>
    )
  } else if (overallRIsLoaded) {
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
        <div className={s.rating}>Rating:<br />{overallRating}</div>
        <div className={s.link_button}><NavLink to={fictionLink}><button>Look!</button></NavLink></div>
      </div>
    )
  }
}

export default FictionElem;
