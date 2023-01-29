import s from './fictionDetails.module.css'
import React from 'react'

const FictionDetails = (props) =>{
  let author_or_director = ''
  if (props.type == 'film'){
    author_or_director = <p><b>Director</b>: {props.info.author}</p>
  } else if (props.type == 'book') {
    author_or_director = <p><b>Author</b>: {props.info.author}</p>
  }

  let rating = React.createRef()
  let changeRating = () =>{
    props.changeUsersRatingOfFiction(rating.current.value)
  }

  let usersRatingSelect = <select ref={rating} onChange={changeRating} value={props.usersRating}>
                              <option value={-1}>Not rated</option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
                          </select>
  let usersRating = ''
  if (props.view == 'loggedInUsersView'){
    usersRating = <div className={s.usersRating}><b>User's rating</b> : {usersRatingSelect} /10</div>
  } else if (props.view == 'notLoggedInUsersView'){
    usersRating = <div></div>
  }

  return (
      <div className={s.details}>
          <div className={s.leftPart}>
            {author_or_director}
            <p><b>Genre</b>: {props.info.genre}</p>
          </div>

          <div className={s.rightPart}>
            <div className={s.overallRating}><b>Overall rating</b> : {props.overallRating}</div>
            {usersRating}
          </div>

          <div className={s.about}>
            <p><b>Date of realease</b>: {props.info.releaseDate}</p>
            <p><b>Description</b>: {props.info.description}</p>
          </div>
      </div>
    )
}

export default FictionDetails;
