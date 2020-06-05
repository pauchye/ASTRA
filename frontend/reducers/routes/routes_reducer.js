import { RECEIVE_ROUTES, RECEIVE_ROUTE, REMOVE_ROUTE } from '../../actions/route_actions';

const routesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ROUTES:
        //   return Object.assign({}, state, { [action.routes.id]: action.routes })
          return Object.assign({}, state, action.routes)
        case RECEIVE_ROUTE:
          return Object.assign({}, state, { [action.post.id]: action.post })
        case REMOVE_ROUTE:
            let newState = Object.assign({}, state);
            delete newState[action.routeId];
            return newState;
        default:
          return state;
      }
}

export default routesReducer;