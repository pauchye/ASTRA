import { connect } from 'react-redux';
import WorkoutIndex from './workout_index'
import { fetchUsersWorkouts, deleteWorkout } from '../../actions/workout_actions'

const mapStateToProps = (state) => {
    
    return {
        currentUser: state.entities.users[state.session.id],
        workouts: Object.values(state.entities.workouts)
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchUsersWorkouts: userId => dispatch(fetchUsersWorkouts(userId)),
        deleteWorkout: workoutId => dispatch(deleteWorkout(workoutId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutIndex)