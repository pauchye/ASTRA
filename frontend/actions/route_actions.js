import * as APIUtil from '../util/routes_api_util';

export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';
// ----- pojo actions
export const receiveRoutes = routes => ({
    type: RECEIVE_ROUTES,
    routes //{ route.id: {description: ..., :id}, route.id: {description: ..., :id} }
});

export const receiveRoute = route => {
  debugger
  return {
    type: RECEIVE_ROUTE,
    route 
}};

export const removeRoute = routeId => {
    return {
        type: REMOVE_ROUTE,
        routeId
    }
}
//----- thunk actions
export const fetchRoutes = () => dispatch => (
    APIUtil.fetchRoutes().then(routes => ( 
      dispatch(receiveRoutes(routes))
    ))
);

export const fetchUsersRoutes = (userId) => dispatch => {
  debugger
    return APIUtil.fetchUsersRoutes(userId).then(routes => { 
      debugger
      return dispatch(receiveRoutes(routes))
    })
};

export const fetchRoute = (routeId) => dispatch => {
    debugger
    return APIUtil.fetchRoute(routeId).then(route => { 
      debugger
      return dispatch(receiveRoute(route))
    })
};

export const createRoute = (route) => dispatch => {
    // debugger
    return APIUtil.createRoute(route).then(res => { 
      // debuggers
      return dispatch(receiveRoute(res))
    })
  };

export const updateRoute = (route) => dispatch => (
    APIUtil.updateRoute(route).then(res => ( 
      dispatch(receiveRoute(res))
    ))
);

export const deleteRoute = (routeId) => dispatch => (
    APIUtil.deleteRoute(routeId).then(() => ( 
      dispatch(removeRoute(routeId))
    ))
);