import React from 'react';
import { Link } from 'react-router-dom';
import RouteShowMap from './route_show_map';

class RouteShow extends React.Component{
    constructor(props){
        
        super(props);
        // this.handleClick = this.handleClick.bind(this)
        this.deleteRoute = this.deleteRoute.bind(this)
    }

    componentDidMount(){
        
        this.props.fetchRoute(this.props.match.params.routeId)
    }

    deleteRoute(){
        this.props.deleteRoute(this.props.match.params.routeId).then(res => {location.hash = '/routes'})  
    }

    render(){
        
        const { route } = this.props;
        if (!route) return null;
        let createddata = route.created_at.split("T")[0];
        let showDuration;
        if(route.estimated_duration/60 > 60){
            showDuration = (Math.floor(route.estimated_duration/60/60).toString()) + ' h ' + Math.floor((route.estimated_duration/60%60)).toString() + ' m'
        } else {
            showDuration = Math.floor((route.estimated_duration/60)).toString() + ' m';
        }
        return(
            <div className='route-show-container'>
                <div className='route-show-top'>
                     <Link to={`/routes`}>My {route.activity} routes</Link>/{route.route_name}
                </div>
                 
                 <div className='route-show-header'>
                     <h2>{route.route_name}</h2>
                     <div className="route-show-btn">
                    <Link className='route-show-edit' to={`/routes/${route.id}/edit`}>Edit</Link> 
                    <div className='route-show-delete' onClick={this.deleteRoute}>Delete</div>
                     </div>
                </div> 
                <div className='route-show-body'>
                    <div className='route-show-map-cont'>
                        <RouteShowMap route={route}/>
                    </div>
                    <div className='route-show-left-cont'>
                        <div className='route-show-user'>
                            <img src={window.ava} className="route-show-ava"/>
                            <div>
                                <div>By {this.props.currentUser.first_name} {this.props.currentUser.last_name}</div>
                                <div>Created at {createddata}</div>
                            </div> 
                        </div>
                        <div className='route-show-stats'>
                            <label>
                               <div>{route.distance}</div>
                               Distance
                           </label>
                           <label>
                              <div>{showDuration}</div>
                              Est.moving time
                            </label>
                        </div>                        
                    </div>
                </div>
                 
                
            </div>
        )
    }
}

export default RouteShow;