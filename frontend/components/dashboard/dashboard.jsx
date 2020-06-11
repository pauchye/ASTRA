import React from 'react';
import { Link } from 'react-router-dom';
import WorkoutItem from '../workouts/workout_item'

class Dashboard extends React.Component {
    constructor(props){
        debugger
        super(props);
        this.state = {
            bool: false
        }
    }

    componentDidMount() {
        this.props.fetchUsersWorkouts(this.props.currentUser.id).then(
            () => this.setState({bool: true})
        )
    }

    render() {
        debugger
        if(!this.state.bool) return null;
        
        const workouts = this.props.workouts;
        const workoutsCU = workouts.filter(workout => workout.user_id === this.props.currentUser.id)
        console.log(workoutsCU)
        const latestWorkout = workouts[workouts.length - 1]
        debugger
        // if(!props.workouts) return null;

        let showLatestWorkout = latestWorkout ? ( 
                <label className = "dash-user-label-act">
                    <div className = "dash-user-label-name">Latest Activity</div>
                    <div > 
                        <div>
                            {latestWorkout.title}
                        </div>
                        <div className = "dash-user-label-wdate">
                            {latestWorkout.date}
                        </div>
                    </div>
        
                </label>
        ) : (
                <div></div>
        );

        return(
            <div className = "dash-main">
                <div className = "dash-user">
                    <img src={window.ava} className='dash-pic-larger'/>
                    <div className = "dash-user-cont">
                    <div className = "dash-user-name">{this.props.currentUser.first_name} {this.props.currentUser.last_name}</div>
                    <label className = "dash-user-label">
                        <div className = "dash-user-label-name">Activities</div>
                        <div>{workoutsCU.length}</div>
                    </label>
                    {showLatestWorkout}
                    </div>
                </div>

                <ul className = "dash-body">
                {
                workouts.map(workout => (
                    <WorkoutItem
                    key={`workout${workout.id}`}
                    workout={workout}
                    currentUser={this.props.currentUser}
                />
                    )
                )
                }
          </ul>
            </div>
        )
    }
}

export default Dashboard;