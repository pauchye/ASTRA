import { combineReducers } from 'redux';
import usersReducer from "./session/users_reducers";
import routesReducer from './routes/routes_reducer';


const entitiesReducer = combineReducers({
  users: usersReducer,
  routes: routesReducer
});

export default entitiesReducer;