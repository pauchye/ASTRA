import { connect } from 'react-redux';
import WorkoutIndex from './workout_index'
import { fetchUsersWorkouts, deleteWorkout } from '../../actions/workout_actions'

const mapStateToProps = (state) => {
    // debugger
    return {
        currentUser: state.entities.users[state.session.id],
        workouts: Object.values(state.entities.workouts)
    }
}

const mapDispatchToProps = dispatch => {
    // debugger
    return {
        fetchUsersWorkouts: userId => dispatch(fetchUsersWorkouts(userId)),
        deleteWorkout: workoutId => dispatch(deleteWorkout(workoutId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutIndex)