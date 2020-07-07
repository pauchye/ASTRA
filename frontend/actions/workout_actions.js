import * as APIUtil from '../util/workouts_api_utils';

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS';
export const RECEIVE_WORKOUT = 'RECEIVE_WORKOUT';
export const REMOVE_WORKOUT = 'REMOVE_WORKOUT';
// ----- pojo actions
export const receiveWorkouts = workouts => {
    
    return {
    type: RECEIVE_WORKOUTS,
    workouts //{ route.id: {description: ..., :id}, route.id: {description: ..., :id} }
}};

export const receiveWorkout = workout => {
  
  return {
    type: RECEIVE_WORKOUT,
    workout 
}};

export const removeWorkout = workoutId => {
  
    return {
        type: REMOVE_WORKOUT,
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

    return APIUtil.fetchUsersWorkouts(userId).then(workouts => { 
 
      return dispatch(receiveWorkouts(workouts))
    })
};

export const fetchWorkout = (workoutId) => dispatch => {
    
    return APIUtil.fetchWorkout(workoutId).then(workout => { 
      
      return dispatch(receiveWorkout(workout))
    })
};

export const createWorkout = (workout) => dispatch => {
    
    return APIUtil.createWorkout(workout).then(res => { 
 
      return dispatch(receiveWorkout(res))
    })
  };

export const updateWorkout = (workout) => dispatch => {
  
    return APIUtil.updateWorkout(workout).then(res => {
      
      dispatch(receiveWorkout(res))
    }) 
};

export const deleteWorkout = (workoutId) => dispatch => {
  
    return APIUtil.deleteWorkout(workoutId).then(() => { 
      
      return dispatch(removeWorkout(workoutId))
    })
};