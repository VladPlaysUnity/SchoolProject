import {changeDynamicInfoOfComment, getCommentsFromDataBase, addComment} from './../../DataBase/Comments.js';

const ADD_COMMENT = 'ADD_COMMENT';
const CHANGE_LIKES_AND_DISLIKES = 'CHANGE_LIKES_AND_DISLIKES';


let intialState = {comments:getCommentsFromDataBase()};

const commentsReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_COMMENT: {
      let newComment = {id:state.comments[state.comments.length-1].id+1, staticInfo: {content:action.info.content, place:action.info.place, author:action.info.author_id}, dynamicInfo:{dislikes: 0, likes: 0,}};
      state.comments = addComment(newComment);
      return state;
    };
    case CHANGE_LIKES_AND_DISLIKES: {
      state.comments = changeDynamicInfoOfComment(action.id, action.like_or_dislike)
      return state;
    };
    default:
      return state;
  }
};


export const addCommentActionCreator = (place, content, author_id) => ({type: ADD_COMMENT, info:{place: place, content: content, author_id: author_id}});
export const changeLikesAndDislikesActionCreator = (id, like_or_dislike) => ({type: CHANGE_LIKES_AND_DISLIKES, id:id, like_or_dislike:like_or_dislike})
export default commentsReducer;
