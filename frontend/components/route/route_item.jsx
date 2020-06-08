import React from 'react';
import { Link } from 'react-router-dom';

class RouteItem extends React.Component{
    constructor(props){
        super(props);
        this.routeData = JSON.parse(props.route.route_data);
        this.markers = [];
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {

        const mapOptions = {
          center: { lat: parseFloat(this.routeData.lat, 10), lng: parseFloat(this.routeData.lng, 10) }, 
          zoom: parseFloat(this.routeData.zoom, 10)

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
            this.placeMarker(location);
            this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay); 
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
        // debugger
        e.preventDefault();
        location.hash = `/routes/${this.props.route.id}`
    }

    render(){
        // debugger
        let data = this.props.route.created_at.split("T")[0]// 2020-06-04T15:37:57.143Z
        return(
            <div  >
                <div></div>
                <div className='routeitem-container' ref='mapNode' onClick={this.handleClick}></div>
                <div>{this.props.route.route_name}</div>
                <label>
                    <div>{this.props.route.distance} </div>
                    Distance
                </label>

                <label>
                    Est.moving time
                    <div>{this.props.route.estimated_duration}</div>
                </label>
                <div>Created at {data}</div>
            </div>           
        )
    }
}


export default RouteItem;