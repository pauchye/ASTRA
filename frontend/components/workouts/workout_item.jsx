import React from 'react';
import { Link } from 'react-router-dom';

class WorkoutItem extends React.Component{
    constructor(props){
        super(props);

    }

    // componentDidMount() {

    // }


    render(){
        debugger
        if(!this.props.workout) return null;
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

        console.log('distMi:', this.props.workout.distance)
        let distMi = (this.props.workout.distance/100).toString() + ' mi';
        
        let pace = ((this.props.workout.duration/60)/(this.props.workout.distance/100)).toFixed(2).toString() + ' min/mi'

        return(
            <div className = "dash-item">
                <div className = "dash-item-inside">
                <div className = "dash-item-top">
                    <div>
                        <img src={window.ava} className='dash-pic-small'/>
                        <div className = "dash-item-pic">{pic}</div>
                    </div>
                    <div>
                    <div className = "dash-item-username">{this.props.currentUser.first_name} {this.props.currentUser.last_name}</div>
                        <div className = "dash-item-date">{data} </div> 
                    </div>
                </div>
                <div className = "dash-item-data">
                    <label>
                        <h4>Distance</h4>
                        <div>{distMi} </div>
                    </label>
                    <label>
                        <h4>Pace</h4>
                        <div>{pace} </div>
                    </label>
                    <label>
                        <h4>Duration</h4>
                        <div>{showDuration} </div>
                    </label>
                </div>
                </div>
                
            </div>           
        )
    }
}


export default WorkoutItem;