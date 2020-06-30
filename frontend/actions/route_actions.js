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
  
    return APIUtil.fetchUsersRoutes(userId).then(routes => { 
      
      return dispatch(receiveRoutes(routes))
    })
};

export const fetchRoute = (routeId) => dispatch => {
    
    return APIUtil.fetchRoute(routeId).then(route => { 
      
      return dispatch(receiveRoute(route))
    })
};

export const createRoute = (route) => dispatch => {
    
    return APIUtil.createRoute(route).then(res => { 
      
      return dispatch(receiveRoute(res))
    })
  };

export const updateRoute = (route) => dispatch => (
    APIUtil.updateRoute(route).then(res => ( 
      dispatch(receiveRoute(res))
    ))
);

export const deleteRoute = (routeId) => dispatch => {
  
    return APIUtil.deleteRoute(routeId).then(() => { 
      
      return dispatch(removeRoute(routeId))
    })
    };