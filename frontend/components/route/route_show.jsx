import React from 'react';
import { Link } from 'react-router-dom';
import RouteShowMap from './route_show_map';

class RouteShow extends React.Component{
    constructor(props){
        debugger
        super(props);
        // this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        debugger
        this.props.fetchRoute(this.props.match.params.routeId)
    }

    // componentDidUpdate(){
    //     debugger
    //     this.props.fetchRoute(this.props.match.params.routeId)
    // }

    render(){
        debugger
        console.log( 'this.props.route', this.props.route)
        const { route } = this.props;
        if (!route) return null;
        let data = route.created_at.split("T")[0]
        let showDuration;
        if(route.estimated_duration/60 > 60){
            showDuration = (Math.floor(route.estimated_duration/60/60).toString()) + ' h ' + Math.floor((route.estimated_duration/60%60)).toString() + ' m'
        } else {
            showDuration = Math.floor((this.dur/60)).toString() + ' m';
        }
        return(
            <div>
                 <Link to={`/routes/${route.id}/edit`}>Edit</Link>
                 <div>This is the route show page</div> 
                 <div>{route.route_name}</div>
                 <label>
                    <div>{route.distance}</div>
                    Distance
                </label>
                <label>
                    Est.moving time
                    <div>{showDuration}</div>
                </label>
                <div>Created at {data}</div>
                <RouteShowMap route={route}/>
            </div>
        )
    }
}

export default RouteShow;