import { connect } from 'react-redux';
import WorkoutForm from './workout_form';
import { createWorkout } from '../../actions/workout_actions';

const mapStateToProps = state => {
    const userId = state.session.id;
    const routes = Object.values(state.entities.routes).filter(route => route.user_id === userId)
    return ({
        postType: 'Create Workout',
        userId,
        workout: {
            title: '',
            description: '',
            sport: 'biking',
            date: '',
            time: '',
            distance: '',
            duration: 0,
            workout_type: ''
        },
        routes
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        action: workout => dispatch(createWorkout(workout))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutForm);