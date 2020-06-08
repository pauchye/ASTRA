import React from 'react';

class SaveRoute extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            distance: this.props.routeInfo.distance,
            estimated_duration: this.props.routeInfo.estimated_duration,
            route_name: this.props.routeInfo.route_name,
            description: this.props.routeInfo.description,
            user_id: this.props.userId,
            activity: this.props.routeInfo.activity,
            route_data: JSON.stringify(this.props.routeData)
        }

        console.log(this.state)
        // debugger
        this.handleSubmit = this.handleSubmit.bind(this)        
    }

    update(field) {
        return event => this.setState({
            [field]: event.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        // debugger
        this.props.action(this.state);
        this.props.closeAndSaveModal();
        location.hash = '/routes'
    }

    render(){
        return(
            <div>
            <h1>this is the modal</h1>
            <form onSubmit={this.handleSubmit}>
                <label> Route name:
                    <input type="text" value={this.state.route_name} placeholder="Route name" onChange={this.update('route_name')}/>
                </label>
                <label> Description:
                    <textarea value={this.state.description} placeholder="Description" onChange={this.update('description')}></textarea>
                </label>
                <button type="submit">submit</button>
            </form>
            </div>
        )
    }

}

export default SaveRoute;