export const fetchRoutes = () => {
    return $.ajax({
      url: `api/routes`
    })
}

export const fetchUsersRoutes = (userId) => {
  debugger
    return $.ajax({
      url: `api/users/${userId}/routes`
    })
}

export const fetchRoute = (routeId) => {
    debugger
    return $.ajax({
      url: `api/routes/${routeId}`
    })
}

export const createRoute = (route) => { 
    return $.ajax({
      url: `api/routes/`,
      method: 'post',
      data: { route: route } //--not sure?? should it match route_params? 
    })
}

export const updateRoute = (route) => {
    return $.ajax({
      url: `api/routes/${route.id}`,
      method: 'patch',
      data: { route: route }
    })
}

export const deleteRoute = (routeId) => {
    return $.ajax({
        url: `api/routes/${routeId}`,
        method: 'delete'
    })
}
