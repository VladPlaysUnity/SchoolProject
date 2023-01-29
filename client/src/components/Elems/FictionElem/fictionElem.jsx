import s from './fictionElem.module.css'
import {useNavigate} from "react-router-dom";
import {getOverallRatingOfFiction} from './../../../DataBase/Fictions.js'
import {useState, useEffect} from 'react'

const FictionElem = (props) =>{
  const [overallRating, setOverallRating] = useState(0)
  const [error, setError] = useState(null);
  const [overallRIsLoaded, setOverallRIsLoaded] = useState(false);
  const [link, setLink] = useState('/fiction/'+props.iD)
  console.log(props.iD);
  let navigate = useNavigate()

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
    author_or_director = <p><b>Director:</b> {props.info.author}</p>
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
          <p><b>Description:</b> {props.info.description.slice(0, 600)}</p>
        </div>
        <div className={s.rating}>Rating:<br />Loading...</div>
        <button className={s.butt1} onClick={()=>{navigate(link)}}>Look!</button>
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
          <p><b>Description:</b> {(props.info.description.length > 600)?props.info.description.slice(0, 600)+"...":props.info.description}</p>
        </div>
        <div className={s.rating}>Rating:<br />{overallRating}</div>
        <button className={s.butt1} onClick={()=>{navigate(link)}}>Look!</button>
      </div>
    )
  }
}

export default FictionElem;
