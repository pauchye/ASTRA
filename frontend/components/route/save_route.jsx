import React from 'react';

class SaveRoute extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            distance: this.props.routeData.distance,
            duration: this.props.routeData.duration,
            route_name: this.props.routeData.route_name,
            description: this.props.routeData.description,
        }
    }

    render(){
        return(
            <div>
            <h1>this is the modal</h1>
            <form>
                <label> Route name:
                    <input type="text" value={this.state.route_name} placeholder="Route name"/>
                </label>
                <label> Description:
                    <textarea value={this.state.description} placeholder="Description"></textarea>
                </label>
            </form>
            </div>
        )
    }

}

export default SaveRoute;