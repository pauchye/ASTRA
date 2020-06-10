import * as APIUtil from '../util/workouts_api_utils';

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS';
export const RECEIVE_WORKOUT = 'RECEIVE_WORKOUT';
export const REMOVE_WORKOUT = 'REMOVE_WORKOUT';
// ----- pojo actions
export const receiveWorkouts = workouts => {
    // debugger
    return {
    type: RECEIVE_WORKOUTS,
    workouts //{ route.id: {description: ..., :id}, route.id: {description: ..., :id} }
}};

export const receiveWorkout = workout => {
  // debugger
  return {
    type: RECEIVE_ROUTE,
    workout 
}};

export const removeWorkout = workoutId => {
    return {
        type: RECEIVE_WORKOUT,
        workoutId
    }
}
//----- thunk actions
export const fetchWorkouts = () => dispatch => (
    APIUtil.fetchWorkouts().then(workouts => ( 
      dispatch(receiveWorkouts(workouts))
    ))
);

export const fetchUsersWorkouts = (userId) => dispatch => {
//   debugger
    return APIUtil.fetchUsersWorkouts(userId).then(workouts => { 
    //   debugger
      return dispatch(receiveWorkouts(workouts))
    })
};

export const fetchWorkout = (workoutId) => dispatch => {
    // debugger
    return APIUtil.fetchWorkout(workoutId).then(workout => { 
      // debugger
      return dispatch(receiveWorkout(workout))
    })
};

export const createWorkout = (workout) => dispatch => {
    // debugger
    return APIUtil.createWorkout(workout).then(res => { 
      // debuggers
      return dispatch(receiveWorkout(res))
    })
  };

export const updateWorkout = (workout) => dispatch => (
    APIUtil.updateWorkout(workout).then(res => ( 
      dispatch(receiveWorkout(res))
    ))
);

export const deleteWorkout = (workoutId) => dispatch => {
  // debugger
    return APIUtil.deleteWorkout(workoutId).then(() => { 
      // debugger
      return dispatch(removeWorkout(workoutId))
    })
};