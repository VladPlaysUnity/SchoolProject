import s from './profile.module.css'
import FriendList from './FriendList/friendList.jsx'
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
      <UsersInfo id={props.id} username={props.info.name}
                 type={props.type} isFriend={props.isFriend}
                 addFriend={props.addFriend} removeFriend={props.removeFriend}/>
      <div className={s.comment_section}>
        User's Comments
        <div className={s.comments}>
          <CommentsContainer comments={props.comments} dispatch={props.dispatch}/>
        </div>
      </div>
      <FriendList friends={props.friends} type={props.type}/>
    </div>
  );
}

export default ProfilePage;
