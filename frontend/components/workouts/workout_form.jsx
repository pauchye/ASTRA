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
        console.log(this.state);
        // this.setState({durHours: Math.floor(this.state.duration/60/60)})
        this.state.durHours = Math.floor(this.state.duration/60/60);
        // this.setState({durMinutes: Math.floor(this.state.duration/60%60)})
        this.state.durMinutes = Math.floor(this.state.duration/60%60);
        
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        console.log(e)
    }

    


    render(){
        let tagVal
        if(this.state.sport === 'biking') {
            tagVal = 'Indoor cycling'
        } else {
            tagVal = 'Treadmill'
        }
        return(
            <div> workout form 
            <form>
                <label> Distance
                    <input 
                    type="text"
                    value={this.state.distance}
                    onChange={this.handleChange}
                    />
                </label>
                <label> Duration
                    <input 
                        type="text"
                        value={this.state.durHours}
                        placeholder='h'
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        value={this.state.durMinutes}
                        placeholder='m'
                        onChange={this.handleChange}
                    />
                </label>
                <label> Sport
                    <select >
                        { sportArray.map((sport, i) => <option key={i} value={sport}>{sport}</option> ) }
                    </select>
                </label>
                <label> Date&time
                    <DatePicker
                        selected={this.state.date}
                        onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleChange} //only when value has changed
                        />
                    <select >
                        { timeArray.map((time, i) => <option key={i} value={time}>{time}</option> ) }
                    </select>
                </label>
                <label> Tag
                    <label for="Commute">Commute
                        <input type="radio" id="Commute" name="tag" value={this.state.type}/>
                    </label>{tagVal}
                    <label for="tagVal">
                        <input type="radio" id="tagVal" name="tag" value={this.state.type}/>
                    </label>
                </label>    
                <label> Description
                    <textarea 
                        value={this.state.description}
                        onChange={this.handleChange}
                    ></textarea>
                </label>
            </form>
            </div>
        )
    }

}

export default WorkoutForm;