import {changeUsersStatusOfFiction} from './../../DataBase/Users.js'
import {changeUsersRatingOfFiction} from './../../DataBase/Fictions.js'
import {} from './../../DataBase/Comments.js'

const CHANGE_USERS_STATUS_OF_FICTION = 'CHANGE-USERS-STATUS-OF-FICTION';
const CHANGE_USERS_RATING_OF_FICTION = 'CHANGE-USERS-RATING-OF-FICTION';
const ADD_COMMENT = 'ADD-COMMENT';

let intialState = {};

const chosenFictionReducer = (state = intialState, action) => {
  switch (action.type) {
    case CHANGE_USERS_STATUS_OF_FICTION:{
      async function changeStatus(){
        await fetch(`http://localhost:5000/user/changeUsersStatusOfFiction/${action.user_id}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({fiction_id:action.fiction_id, status:action.status}),
          })
      }
      changeStatus()
      return state
    }
    case CHANGE_USERS_RATING_OF_FICTION:{
      async function changeRating() {
        await fetch(`http://localhost:5000/fiction/changeUsersRatingOfFiction/${action.fiction_id}/${action.user_id}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({rating:action.rating}),
          })
      }
      changeRating()
      return state
    }
    case ADD_COMMENT: {
      //addComment(action.author_id, action.place_id, action.content)
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
