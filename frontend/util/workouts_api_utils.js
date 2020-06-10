export const fetchWorkouts = () => {
    return $.ajax({
      url: `api/workouts`
    })
}

export const fetchUsersWorkouts = (userId) => {
  // debugger
    return $.ajax({
      url: `api/users/${userId}/workouts`
    })
}

export const fetchWorkout = (workoutId) => {
    // debugger
    return $.ajax({
      url: `api/workouts/${workoutId}`
    })
}

export const createWorkout = (workout) => { 
    return $.ajax({
      url: `api/workouts/`,
      method: 'post',
      data: { workout: workout } //--not sure?? should it match route_params? 
    })
}

export const updateWorkout = (workout) => {
    return $.ajax({
      url: `api/workouts/${workout.id}`,
      method: 'patch',
      data: { workout: workout }
    })
}

export const deleteWorkout = (workoutId) => {
    // debugger
    return $.ajax({
        url: `api/workouts/${workoutId}`,
        method: 'delete'
    })
}
