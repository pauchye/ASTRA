import React from 'react';
import { Link } from 'react-router-dom';
import WorkoutIndexItem from '../workouts/workout_index_item'

function debounce(fn, time) {
    let timeoutHandle = null;
    let lastArgs = null;
  
    return function(...args) {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
      const that = this;
      lastArgs = args;
      timeoutHandle = setTimeout(() => {
        fn.apply(that, lastArgs);
      }, time);
    }
  }

class WorkoutIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bool: false
        }
        this.updateFilter = this.updateFilter.bind(this);
        this.updateSport = this.updateSport.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsersWorkouts(this.props.currentUser.id).then(
            () => this.setState({bool: true})
        )
    }
    
    updateFilter(event) {
        event.persist();
        if(!this.debounced) {
            this.debounced = debounce(() => {
                    this.setState({filter: event.target.value})
             }, 600);
        }
        this.debounced();
    }

    updateSport(event) {
        event.persist();
            this.setState({filtSport: event.target.value})
    }

    render() {
        
        if(!this.state.bool) return null;
        const workouts = this.props.workouts;
        const workoutsCU = workouts.filter(workout => workout.user_id === this.props.currentUser.id)
        const latestWorkout = workouts[workouts.length - 1]
        let filteredWorkouts = workouts;
        
        if(this.state.filtSport){
            if(this.state.filtSport==="All"){
                filteredWorkouts = workouts
            } else {
               filteredWorkouts = filteredWorkouts.filter(workout => {
                return workout.sport === this.state.filtSport;
            }); 
            }
        }
        if(this.state.filter){
            filteredWorkouts = workouts.filter(workout => {
                return workout.title.split(" ").map((el) => { return el.toUpperCase()}).includes(this.state.filter.toUpperCase())
            });
        }


        let paceArray = [];
        let effort = 0;
        filteredWorkouts.forEach((workout) => {
            paceArray.push(((workout.duration/60)/(workout.distance/100))); 
        })
        if(paceArray.length > 0){
            effort = paceArray.reduce((accumulator, currentValue) => accumulator + currentValue)/paceArray.length;
        }
        
        return(
            <div className="work-ind-main">
                <h1>My activities</h1>
             
                <div >
                    <Link to='/workouts/new' className='work-ind-link' >Create New Workout</Link>
                    <div>
                        <label className="work-ind-lab">
                            <div>{workoutsCU.length} Activities</div>
                        </label>
                    </div>
                </div>
                <label className="work-ind-search"> 
                    <div className="work-ind-search-left">
                       <div>Keywords</div>
                       <input type="text" onChange={this.updateFilter}/> 
                    </div>
                    <div>
                        <div>Sport</div>
                        <select className="work-ind-search-select" onChange={this.updateSport}>
                                <option className="routeform-option" value="All">All</option>
                                <option className="routeform-option" value="biking">Biking</option>
                                <option className="routeform-option" value="running">Running</option>
                            </select>
                    </div>   
                </label>      
                <ul className="work-ind-list">
                    <li className="work-ind-line">
                        <div className="work-ind-1">Sport</div>
                        <div className="work-ind-2">Date</div>    
                        <div className="work-ind-3">Title</div> 
                        <div className="work-ind-4">Time</div> 
                        <div className="work-ind-5">Distance</div> 
                        <div className="work-ind-6">Pace</div> 

                        <div className="work-ind-7 tooltip">Relative effort
                        <span className="tooltiptext">Relative effort shows this workout pace comparing to avarage pace</span>
                        </div> 

                        <div className="work-ind-8"></div> 
                        <div className="work-ind-9"></div> 
                    </li>
                {
                filteredWorkouts.map(workout => (
                    <WorkoutIndexItem
                    key={`workout${workout.id}`}
                    workout={workout}
                    currentUser={this.props.currentUser}
                    deleteWorkout={this.props.deleteWorkout}
                    effort={effort}
                />
                    )
                )
                }
          </ul>
            </div>
        )
    }
}

export default WorkoutIndex;