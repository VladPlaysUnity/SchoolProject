import {} from './../../DataBase/Comments.js'
import {getLoggedUserId, setLoggedUserId} from './../../LocalInfo/localInfo.js'
import {followUser, unfollowUser} from './../../DataBase/Users.js'

const CHANGE_LIKE_OR_DISLIKE_OF_COMMENT= 'CHANGE-LIKE-OR-DISLIKE-OF-COMMENT';
const ADD_USER_AS_FRIEND = 'ADD-USER-AS-FRIEND';
const REMOVE_USER_FROM_FRIENDLIST = 'REMOVE-USER-FROM-FRIENDLIST'

let initialState = {}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LIKE_OR_DISLIKE_OF_COMMENT:{
      //changeLikeOrDislikeOfComment(action.user_id, action.comment_id, action.like_or_dislike)
      return state
    }
    case ADD_USER_AS_FRIEND:{
      followUser(action.logged_user_id, action.friend_user_id)
      return state
    }
    case REMOVE_USER_FROM_FRIENDLIST:{
      unfollowUser(action.logged_user_id, action.friend_user_id)
      return state
    }

    default:
      return state;
  }
};

export default profileReducer;

export const changeLikeOrDislikeOfCommentActionCreator = (user_id, comment_id, like_or_dislike) => (
  {type: CHANGE_LIKE_OR_DISLIKE_OF_COMMENT, user_id:user_id, comment_id:comment_id, like_or_dislike:like_or_dislike});
export const addUserAsFriendActionCreator = (logged_user_id, friend_user_id) => (
  {type: ADD_USER_AS_FRIEND, logged_user_id:logged_user_id, friend_user_id:friend_user_id});
export const removeUserFromFriendlistActionCreator = (logged_user_id, friend_user_id) => (
  {type: REMOVE_USER_FROM_FRIENDLIST, logged_user_id:logged_user_id, friend_user_id:friend_user_id});
