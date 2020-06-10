import React from 'react';
import { Link } from 'react-router-dom';

class WorkoutItem extends React.Component{
    constructor(props){
        super(props);

    }

    // componentDidMount() {

    // }


    render(){
        // debugger
        let pic 
        if(this.props.workout.sport === 'running'){
            pic= <i className="fas fa-running"></i>
        } else {
            pic = <i className="fas fa-bicycle"></i>
        }

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
            <div>
                <div>
                    <img src={window.ava} className='dash-pic-small'/>
                    <div>{pic}</div>
                </div>
                <div>
                   <div>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</div>
                    <div>{data} </div> 
                </div>

                <div>
                    <label>
                        <div>{distMi} </div>
                        Distance
                    </label>
                    <label>
                        <div>{pace} </div>
                        Pace
                    </label>
                    <label>
                        <div>{showDuration} </div>
                        Duration
                    </label>
                </div>
                
                
            </div>           
        )
    }
}


export default WorkoutItem;