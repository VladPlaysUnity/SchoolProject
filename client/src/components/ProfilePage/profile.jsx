import s from './profile.module.css'
import FollowList from './FollowList/followList.jsx'
import UsersInfo from './UsersInfo/usersInfo.jsx'
import CommentsContainer from './../CommentsComponent/commentsContainer.jsx'
import { useState } from 'react'

const ProfilePage = (props) =>{
  const [editPhoto, setEditPhoto] = useState('')

  let mainClass = ''
  switch (props.type) {
    case 'loggedUsersProfile':
      mainClass = s.profile_of_logged_user
    case 'notLoggedUsersProfile':
      mainClass = s.profile_of_not_logged_user
    default:
      mainClass = s.nobody_is_logged_in
  }

  let profPhoto = ''
  if (props.editMode){
    profPhoto = <div className={s.editPhoto}>
                  <div>PhotoUrl:</div>
                  <div>
                    <input value={editPhoto} onChange={(e)=>setEditPhoto(e.target.value)} type='text'/>
                    <button onClick={()=>setEditPhoto('')}>Clear</button>
                  </div>
                  <div>Preview:</div>
                  <div><img src={editPhoto}/></div>
                  <button onClick={()=>props.changeProfilePhoto(editPhoto)}>Save</button>
                </div>
  } else{
    profPhoto = <div className={s.photo}><img src={(props.info.profilePhoto!='')?props.info.profilePhoto:"https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=170667a&w=0&h=FXkT-N6vISLOCUefa9MyQg0pH-6loMX9zBZjgLK458c="} /></div>
  }

  return (
    <div className={s.profile}>
      <div className={s.upperPart}>
        {profPhoto}
        <UsersInfo iD={props.iD} username={props.info.name} editMode={props.editMode} togEdit={props.togEdit}
                 view={props.view} isFollowed={props.isFollowed}
                 followUser={props.followUser} unfollowUser={props.unfollowUser}/>
      </div>
      <div className={s.lowerPart}>
      <div className={s.comment_section}>
        User's Comments
        <div className={s.comments}>
          <CommentsContainer comments={props.comments} like_or_dislike={props.like_or_dislike} dispatch={props.dispatch}/>
        </div>
      </div>
      <FollowList iD={props.iD} view={props.view}/>
      </div>
    </div>
  );
}

export default ProfilePage;
