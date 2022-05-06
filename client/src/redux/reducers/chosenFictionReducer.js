import {changeUsersStatusOfFiction} from './../../DataBase/Users.js'
import {changeUsersRatingOfFiction} from './../../DataBase/Fictions.js'
import {addComment} from './../../DataBase/Comments.js'

const CHANGE_USERS_STATUS_OF_FICTION = 'CHANGE-USERS-STATUS-OF-FICTION';
const CHANGE_USERS_RATING_OF_FICTION = 'CHANGE-USERS-RATING-OF-FICTION';
const ADD_COMMENT = 'ADD-COMMENT';

let intialState = {};

const chosenFictionReducer = (state = intialState, action) => {
  switch (action.type) {
    case CHANGE_USERS_STATUS_OF_FICTION:{
      changeUsersStatusOfFiction(action.user_id, action.fiction_id, action.status)
      return state
    }
    case CHANGE_USERS_RATING_OF_FICTION:{
      changeUsersRatingOfFiction(action.fiction_id, action.user_id, action.rating)
      return state
    }
    case ADD_COMMENT: {
      console.log(4);
      addComment(action.author_id, action.place_id, action.content)
      return state;
    };
    default:
      return state
  }
};

export default chosenFictionReducer;

export const changeUsersStatusOfFictionActionCreator = (user_id, fiction_id, status) =>(
  {type: CHANGE_USERS_STATUS_OF_FICTION, user_id: user_id, fiction_id: fiction_id, status: status}
);
export const changeUsersRatingOfFictionActionCreator = (fiction_id, user_id, rating) =>(
  {type: CHANGE_USERS_RATING_OF_FICTION, user_id:user_id, fiction_id:fiction_id, rating:rating}
);
export const addCommentActionCreator = (author_id, place_id, content) =>(
  {type: ADD_COMMENT, place_id: place_id, content: content, author_id: author_id}
);