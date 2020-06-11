import React from 'react';
import { Link } from 'react-router-dom';

class WorkoutIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.deleteWorkout = this.deleteWorkout.bind(this)
    }

    // componentDidMount() {

    // }
    deleteWorkout(){
        debugger
            this.props.deleteWorkout(this.props.workout.id)  
    }        

    render(){
        // debugger
        let data = this.props.workout.created_at.split("T")[0]// 2020-06-04T15:37:57.143Z
        let showDuration;
        if(this.props.workout.duration/60 > 60){
            showDuration = (Math.floor(this.props.workout.duration/60/60).toString()) + ' h ' + Math.floor((this.props.workout.duration/60%60)).toString() + ' m'
        } else {
            showDuration = Math.floor((this.props.workout.duration/60)).toString() + ' min';
        }

        let distMi = (this.props.workout.distance/100).toString() + ' mi';
        
        let pace = ((this.props.workout.duration/60)/(this.props.workout.distance/100)).toFixed(2).toString() + ' min/mi'
        
        return(
            <li className="work-ind-line">
                <div className="work-ind-1">{this.props.workout.sport}</div>
                <div className="work-ind-2">{data}</div>
                <div className="work-ind-3">{this.props.workout.title}</div>
                <div className="work-ind-4">{showDuration}</div>
                <div className="work-ind-5">{distMi}</div>
                <div className="work-ind-6">{pace} </div>
                <Link className="work-ind-7" to={`/workouts/${this.props.workout.id}/edit`}>Edit</Link>
                <div className='work-ind-8' onClick={this.deleteWorkout}>Delete</div>                
            </li>           
        )
    }
}


export default WorkoutIndexItem;