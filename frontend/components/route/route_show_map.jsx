import React from 'react';

class RouteShowMap extends React.Component{
    constructor(props){
        super(props)
        this.routeData = JSON.parse(props.route.route_data);
        this.markers = [];
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this)
    }

    componentDidMount() {
        const mapOptions = {
          center: { lat: parseFloat(this.routeData.path[0].lat, 10), lng: parseFloat(this.routeData.path[0].lng, 10) }, 
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

    render(){

        return(
            <div > 
                <div className='routeshow-container' ref='mapNode'></div>
           </div>
        )
    }
}

export default RouteShowMap;
