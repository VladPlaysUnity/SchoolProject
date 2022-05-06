import {createStore, combineReducers} from "redux";
import registrationReducer from './reducers/registrationReducer.js';
import profileReducer from './reducers/profileReducer.js';
import chosenFictionReducer from './reducers/chosenFictionReducer.js';


let reducers = combineReducers({
  registrationR: registrationReducer,
  profileR: profileReducer,
  chosenFictionR:chosenFictionReducer
});

let store = createStore(reducers);

export default store;
