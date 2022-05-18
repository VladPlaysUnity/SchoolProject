import s from './chosenFiction.module.css'
import React from 'react'
import FictionDetails from './FictionDetails/fictionDetails.jsx'
import CommentsContainer from './../CommentsComponent/commentsContainer.jsx'
import WriteCommentSection from './WriteCommentSection/writeCommentSection.jsx'
import AtFollowed from './AtFollowed/atFollowed.jsx'

const ChosenFiction = (props) =>{

  let status_line = React.createRef()

  let details = ''
  let select_options = <div></div>
  let wcs = <div></div>

  let changeStatus = () =>{
    props.changeUsersStatusOfFiction(status_line.current.value)
  }

  if (props.fiction.type == 'film' ){
    details = <FictionDetails changeUsersRatingOfFiction={props.changeUsersRatingOfFiction} view={props.view} info={props.fiction.info} overallRating={props.overallRating} usersRating={props.usersRating} type={props.fiction.type}/>
    if (props.view == "loggedInUsersView"){
      select_options = <select ref={status_line} onChange={changeStatus} value={props.usersStatus} name='status'>
                        <option value='completed'>Watched</option>
                        <option value='in progress'>Watching</option>
                        <option value='planned'>Planned</option>
                        <option value='dropped'>Dropped</option>
                        <option value='not completed'>Not watched</option>
                      </select>
      wcs = <WriteCommentSection addComment={props.addComment}/>

    }
  } else if (props.fiction.type == 'book') {
    details = <FictionDetails changeUsersRatingOfFiction={props.changeUsersRatingOfFiction} view={props.view} info={props.fiction.info} overallRating={props.overallRating} usersRating={props.usersRating} type={props.fiction.type}/>
    if (props.view == "loggedInUsersView"){
      select_options = <select ref={status_line} onChange={changeStatus} value={props.usersStatus} name='status'>
                        <option value='completed'>Read</option>
                        <option value='in progress'>Reading</option>
                        <option value='planned'>Planned</option>
                        <option value='dropped'>Dropped</option>
                        <option value='not completed'>Not read</option>
                      </select>
      wcs = <WriteCommentSection addComment={props.addComment}/>
    }
  }

  let atFollowed = ''
  if (props.view=="loggedInUsersView"){
    atFollowed = <AtFollowed userID={props.userID} view={props.view}/>
  } else if (props.view=="notLoggedInUsersView"){
    atFollowed = <div></div>
  }

  return (
    <div className={s.chosenFiction}>
      <div className={s.name}>{props.fiction.info.name}</div>

      <div className={s.upperPart}>
        <div className={s.fiction}>
          <div className={s.coverPhoto}><img src={props.fiction.info.coverPhoto}/></div>
          <div className={s.status}>
            {select_options}
          </div>
        </div>

        {details}
      </div>

      <div className={s.lowerPart}>
        <div className={s.link_to_download}>Link to download</div>

        <div className={s.cta}>
            {wcs}
            <CommentsContainer comments={props.comments} like_or_dislike={props.like_or_dislike} dispatch={props.dispatch}/>
        </div>
        {atFollowed}
      </div>
    </div>
  )
}


export default ChosenFiction;
