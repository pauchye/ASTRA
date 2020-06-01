import { combineReducers } from 'redux';
import usersReducer from "./session/users_reducers";


const entitiesReducer = combineReducers({
  users: usersReducer,

});

export default entitiesReducer;