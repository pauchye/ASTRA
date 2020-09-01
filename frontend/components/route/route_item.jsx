import React from 'react';
import { Link } from 'react-router-dom';

class RouteItem extends React.Component{
    constructor(props){
        super(props);
        this.routeData = JSON.parse(props.route.route_data);
        this.markers = [];
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.delayFactor = 1;
    }

    componentDidMount() {
        const mapOptions = {
          center: { lat: parseFloat(this.routeData.path[0].lat, 10), lng: parseFloat(this.routeData.path[0].lng, 10) }, 
          zoom: parseFloat(this.routeData.zoom, 10),
          gestureHandling: 'none',
          zoomControl: false
        };
        
        this.directionsService = new google.maps.DirectionsService(); 
        this.directionsDisplay = new google.maps.DirectionsRenderer(
            {suppressMarkers: true,
             polylineOptions: { strokeColor: "#FC4C02" } ,
             preserveViewport: true }
            ); 

        this.map = new google.maps.Map(this.refs.mapNode, mapOptions);
        this.directionsDisplay.setMap(this.map);

        this.routeData.path.forEach(location => {
            this.delayFactor++  
            setTimeout( () => {
                this.placeMarker(location);
                this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay); 
            }, this.delayFactor*350)   
        })

    }
    calculateAndDisplayRoute(directionsService, directionsDisplay) {
        let wayPoints = this.markers.slice(1, this.markers.length - 1 ).map(marker => ({location: marker.position, stopover: false})) || [];

        if(this.markers.length > 1) {

            directionsService.route({
                origin: this.markers[0].position,
                waypoints: wayPoints,
                destination: this.markers[this.markers.length - 1].position,
                travelMode: 'WALKING'
            }, (response, status) => {

                if (status === 'OK') {  
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });  
        }            
    }

    placeMarker(location) {
        let marker = new google.maps.Marker({
            position: location, 
            map: this.map
        });
        this.markers.push(marker)
    }

    handleClick(e){
        
        e.preventDefault();
        location.hash = `/routes/${this.props.route.id}`
    }

    render(){
        
        let data = this.props.route.created_at.split("T")[0]// 2020-06-04T15:37:57.143Z
        let showDuration;
        if(this.props.route.estimated_duration/60 > 60){
            showDuration = (Math.floor(this.props.route.estimated_duration/60/60).toString()) + ' h ' + Math.floor((this.props.route.estimated_duration/60%60)).toString() + ' m'
        } else {
            showDuration = Math.floor((this.props.route.estimated_duration/60)).toString() + ' m';
        }
        return(
            <div className='route-ind-li' >
                <div className='routeitem-container' ref='mapNode' onClick={this.handleClick}></div>
                <div className='route-ind-li-data'>
                    <Link to={`/routes/${this.props.route.id}`} className="route-ind-showlink">{this.props.route.route_name}</Link>
                    <label>
                        <div>{this.props.route.distance} </div>
                        Distance
                    </label>
                    <label>
                        <div>{showDuration}</div>
                        Est.moving time
                    </label>
                     
                </div>
                <div className="route-it-timestamp">Created at {data}</div>
            </div>           
        )
    }
}


export default RouteItem;