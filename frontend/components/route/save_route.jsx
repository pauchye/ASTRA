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
            route_data: JSON.stringify(this.props.routeData),
            id: this.props.routeInfo.id
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
        debugger
        this.props.action(this.state)
        .then(res => {
            this.props.closeAndSaveModal();
            return res;
        }).then(res => {location.hash = '/routes'})       
        
    }

    render(){
        const { closeModal } = this.props
        return(
            <div className='modal-save'> 
            <h3>My Route</h3>
            <form onSubmit={this.handleSubmit}>
                <label> <div className="modal-small-text">Route name:</div>
                    
                    <input type="text" value={this.state.route_name} placeholder="Route name" onChange={this.update('route_name')}/>
                </label>
                <label> <div className="modal-small-text">Description:</div>
                    <textarea value={this.state.description} placeholder="Add some more details or notes" onChange={this.update('description')}></textarea>
                </label>
                <div className="modal-button">
                  <button onClick={closeModal} >Edit Route</button>  
                  <button type="submit">Save to My Routes</button>  
                </div>
                
            </form>
            </div>
        )
    }

}

export default SaveRoute;