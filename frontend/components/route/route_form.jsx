import React from 'react';


class RouteForm extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.route;
        this.routeData = JSON.parse(props.route.route_data);
        // console.log(this.routeData)
        this.markers = [];
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay) {
        console.log('last marker', this.markers[this.markers.length - 1].position);
        let wayPoints = this.markers.slice(1, this.markers.length - 1 ).map(marker => ({location: marker.position, stopover: false})) || [];
        console.log(wayPoints)
        if(this.markers.length > 1) {
            directionsService.route({
                origin: this.markers[0].position,
                waypoints: wayPoints,
                destination: this.markers[this.markers.length - 1].position,
                travelMode: 'WALKING'
            }, function(response, status) {
                if (status === 'OK') {  
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });  
        }            
    }

    componentDidMount() {
        const mapOptions = {
          center: { lat: 40.779914, lng: -73.970519 }, // this is NYC
          zoom: 13
        };

        this.directionsService = new google.maps.DirectionsService(); //???
        this.directionsDisplay = new google.maps.DirectionsRenderer(
            {suppressMarkers: true},
            { polylineOptions: { strokeColor: "#FC4C02" } }
            ); //???

        this.map = new google.maps.Map(this.refs.mapNode, mapOptions);
        this.directionsDisplay.setMap(this.map)
        google.maps.event.addListener(this.map, 'click', (event) => {
            this.placeMarker(event.latLng);
            this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
            console.log(this.markers)
        });
        // let marker = new google.maps.Marker({position: {lat: 40.779914, lng: -73.970519}});
        // let route = null; // [ (x,y), (x,y) ]
        // this.map.drawLine(route);

        // marker.setMap(this.map);

        // this.markers.forEach(marker =>{
        //     marker.setMap(this.map)
        // })
        
    }

    

    // function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    //     directionsService.route({
    //       origin: document.getElementById('start').value,
    //       destination: document.getElementById('end').value,
    //       travelMode: 'DRIVING'
    //     }, function(response, status) {
    //       if (status === 'OK') {
    //         directionsDisplay.setDirections(response);
    //       } else {
    //         window.alert('Directions request failed due to ' + status);
    //       }
    //     });
    //   }

    // google.maps.event.addListener(map, 'click', function(event) {
    //     placeMarker(event.latLng);
    //  });
     
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
                <div>this is mapform</div>
                <div className='routeform-container' ref='mapNode'></div>

            </div>
            
        )
    }
}


export default RouteForm;