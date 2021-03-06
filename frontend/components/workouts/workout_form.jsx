import React from 'react';
import DatePicker from 'react-datepicker';
 
import 'react-datepicker/dist/react-datepicker.css';

const sportArray = ['biking', 'running'];

const timeArray = ['12:00 AM', '12:30 AM', 
        '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM',
        '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM',
        '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
        '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
        '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
        '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']

class WorkoutForm extends React.Component {
    constructor(props){
        super(props);
        this.state = props.workout;

        this.state.durHours = Math.floor(this.state.duration/60/60);

        this.state.durMinutes = Math.floor(this.state.duration/60%60);
        this.state.user_id = this.props.userId;
        this.state.val = 'mi';
        this.state.distance = (this.state.distance/100).toString()

        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(input){
        return (e) => {
            this.setState({[input]: e.currentTarget.value})
        }
    }


    handleSubmit(e){
        e.preventDefault();
        let inputObject = Object.assign({}, this.state);
        //distance
        let dist = this.state.distance.split(".")
        if(!dist[1]) dist[1]='00'
        if(dist[1].length < 2) dist[1] +='0'
        if(dist[1].length > 2) dist[1] = dist[1].split('').slice(0,2).join("")
        let distNum = parseInt(dist[0], 10)*100 + parseInt(dist[1], 10);
        if(this.state.val === 'km'){
            distNum = distNum * 0.62137;
        }
        inputObject.distance = distNum;
        // duration
        inputObject.duration = this.state.durHours*60*60 + this.state.durMinutes*60;
        
        this.props.action(inputObject)
            .then(res => {location.hash = '/workouts'})  
    }


    render(){

        let tagVal
        if(this.state.sport === 'biking') {
            tagVal = 'Indoor cycling'
        } else {
            tagVal = 'Treadmill'
        }
        
        return(
            <div className="work-form-main"> 
            
            <div className="work-form-nav"> 
                Manual
            </div>
            
            <div className="work-form-body">
                <h3>Manual Entry</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="work-form-first">
                    <label> 
                        <div className="work-form-small">Distance</div>
                        <div>
                        <input 
                            type="text"
                            value={this.state.distance}
                            onChange={this.handleChange('distance')}
                            placeholder = '1.00'
                        />
                        <select defaultValue="mi" onChange={this.handleChange('val')}>
                            <option value="mi">mi</option>
                            <option value="km">km</option>
                        </select>
                        </div>
                    </label>
                    <label > 
                        <div className="work-form-small">Duration</div>
                        
                       <div className="work-form-dur">
                        <input 
                            type="number"
                            value={this.state.durHours}
                            placeholder='h'
                            onChange={this.handleChange('durHours')}
                        />
                        <input 
                            type="number"
                            value={this.state.durMinutes}
                            placeholder='m'
                            onChange={this.handleChange('durMinutes')}
                        />
                        </div>
                    </label>
                </div >
                <div className="work-form-second">
                   <label className="work-form-second-label"> 
                       <div className="work-form-small">Sport</div>
                        <select onChange={this.handleChange('sport')}>
                            { sportArray.map((sport, i) => <option key={i} value={sport}>{sport}</option> ) }
                        </select>
                   </label>
                   <label className="work-form-second-label"> 
                        <div className="work-form-small">Tag</div>
                        <div className="work-form-tag">
                            <label >Commute </label>
                            <input type="radio" id="Commute" name="tag" value={this.state.type} onChange={this.handleChange('type')}/>
                            
                        </div>
                        
                        <div className="work-form-tag">
                            <label>{tagVal}</label>
                            <input type="radio" id="tagVal" name="tag" value={this.state.type} onChange={this.handleChange('type')}/>
                        </div> 
                   </label> 
                   <label className="work-form-second-label"> 
                       <div className="work-form-small">Date&time</div>
                       <div className="work-form-date">
                            <input className="work-form-cal" type="date" value={this.state.date} onChange={this.handleChange('date')}/>
                            <select onChange={this.handleChange('time')}>
                            { timeArray.map((time, i) => <option key={i} value={time}>{time}</option> ) }
                            </select>
                        </div>
                </label> 
                </div>
                <div>
                    <label> 
                        <div className="work-form-small">Title</div>
                        <input 
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange('title')}
                        />
                    </label>
                </div>
                
                
                <label> 
                    <div className="work-form-small">Description</div>
                    <textarea 
                        value={this.state.description}
                        onChange={this.handleChange('description')}
                        placeholder="How did it go? Were you tired or rested? How was the weather?"
                    ></textarea>
                </label>
                <button className="work-form-button" type="submit">{this.props.postType}</button>
            </form>
            </div>
            </div>
        )
    }

}

export default WorkoutForm;