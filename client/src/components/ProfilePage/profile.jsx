import s from './profile.module.css'
import FollowList from './FollowList/followList.jsx'
import UsersInfo from './UsersInfo/usersInfo.jsx'
import CommentsContainer from './../CommentsComponent/commentsContainer.jsx'


const ProfilePage = (props) =>{
  let comments = []

  let mainClass = ''
  switch (props.type) {
    case 'loggedUsersProfile':
      mainClass = s.profile_of_logged_user
    case 'notLoggedUsersProfile':
      mainClass = s.profile_of_not_logged_user
    default:
      mainClass = s.nobody_is_logged_in
  }

  return (
    <div className={s.profile}>
      <div className={s.photo}><img src={props.info.profilePhoto} /></div>
      <UsersInfo iD={props.iD} username={props.info.name}
                 view={props.view} isFollowed={props.isFollowed}
                 followUser={props.followUser} unfollowUser={props.unfollowUser}/>
      <div className={s.comment_section}>
        User's Comments
        <div className={s.comments}>
          <CommentsContainer comments={props.comments} like_or_dislike={props.like_or_dislike} dispatch={props.dispatch}/>
        </div>
      </div>
      <FollowList followedPeople={props.followedPeople} view={props.view}/>
    </div>
  );
}

export default ProfilePage;
