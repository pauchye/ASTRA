import { connect } from 'react-redux';
import WorkoutForm from './workout_form';
import { updateWorkout, fetchWorkout } from '../../actions/workout_actions';
import React from 'react';

class EditWorkoutForm extends React.Component {
    componentDidMount(){
        // debugger
        this.props.fetchWorkout(this.props.match.params.workoutId)
    }

    render() {
        const { postType, userId, workout, routes, action} = this.props;
        // debugger
        if(!workout) return null;
        return(
          <WorkoutForm
            postType={postType}
            userId={userId}
            workout={workout}
            routes={routes}
            action={action}
        />   
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const userId = state.session.id;
    const routes = Object.values(state.entities.routes).filter(route => route.user_id === userId)
    debugger
    return ({
        postType: 'Update Workout',
        userId,
        workout: state.entities.workouts[ownProps.match.params.workoutId],
        routes
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        action: workout => dispatch(updateWorkout(workout)),
        fetchWorkout: workoutId => dispatch(fetchWorkout(workoutId))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkoutForm);