import React from 'react';
import Modal from '../modal/modal';
import { Link, useLocation } from 'react-router-dom';

class RouteForm extends React.Component{
    constructor(props){
        
        super(props);
        this.state = this.props.route;
        this.routeData = JSON.parse(props.route.route_data);
        this.markers = [];
        // this.route_path = this.routeData.path; //"path":[{"lat":0,"lng":0},{"lat":0,"lng":0}]
        this.dist = 0;
        this.dur = 0;
        this.custTravelMode = 'BICYCLING';
        this.delayFactor = 1;
 
        this.routeInfo = {
            route_name: this.props.route.route_name, 
            description: this.props.route.description,
            activity: this.props.route.activity,
            road_type: this.props.route.road_type,
            distance: this.props.route.distance,
            estimated_duration: this.props.route.estimated_duration,
            elevation: this.props.route.elevation,
            id: this.props.route.id
        }
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateMapFilter = this.updateMapFilter.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay) {
        let wayPoints = this.markers.slice(1, this.markers.length - 1 ).map(marker => ({location: marker.position, stopover: false})) || [];
        this.dist = 0;
        this.dur = 0;
        if(this.markers.length > 1) {
            
            directionsService.route({
                origin: this.markers[0].position,
                waypoints: wayPoints,
                destination: this.markers[this.markers.length - 1].position,
                travelMode: this.custTravelMode
            }, (response, status) => {

                if (status === 'OK') {  
                    directionsDisplay.setDirections(response);
                    let start = response.routes[0].legs[0].start_location;
                    let end = response.routes[0].legs[0].end_location;

                    this.dist += response.routes[0].legs[0].distance.value;
                    this.routeInfo.distance = (Math.round((this.dist*0.000621371)*100)/100).toString() + ' mi'; //Math.round(num * 100) / 100
                    this.setState({distance: this.routeInfo.distance})

                    this.dur += response.routes[0].legs[0].duration.value;
                    this.routeInfo.estimated_duration = this.dur;
                    let showDuration;
                    if(this.routeInfo.estimated_duration/60 > 60){
                        showDuration = (Math.floor(this.routeInfo.estimated_duration/60/60).toString()) + ' h ' + Math.floor((this.routeInfo.estimated_duration/60%60)).toString() + ' m'
                    } else {
                        showDuration = Math.floor((this.dur/60)).toString() + ' m';
                    }
                    this.setState({estimated_duration: showDuration})

                    // if(this.routeData.path.length === 0){
                    //     this.routeData.path.push(start);
                    //     this.routeData.path.push(end);
                    //     this.routeData.lat = start.lat();
                    //     this.routeData.lng = start.lng();
                    // } else {
                    //     this.routeData.path.push(end);
                    // }


                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });  
        }            
    }

    componentDidMount() {
        // getting center of the map
        let maplat;
        let maplng;
        if(this.routeData.path[0] === undefined){
            maplat = 40.779914;
            maplng = -73.970519;
        } else {
            maplat = parseFloat(this.routeData.path[0].lat, 10);
            maplng = parseFloat(this.routeData.path[0].lng, 10);
        }
// data to pass to google maps
        const mapOptions = {
          center: { lat: maplat, lng: maplng }, 
          zoom: 13,
          mapTypeId: 'roadmap'
        };
// creating directions
        this.directionsService = new google.maps.DirectionsService(); 
        this.directionsDisplay = new google.maps.DirectionsRenderer(
            {suppressMarkers: true,
             polylineOptions: { strokeColor: "#FC4C02" } ,
             preserveViewport: true }
            ); 
// creating a map 
        this.map = new google.maps.Map(this.refs.mapNode, mapOptions);
// connecting directions and map
        this.directionsDisplay.setMap(this.map);
// bootstraping map
        window.googleMap = this.map;
// existing marker and dirs from db
        this.routeData.path.forEach(location => {  
            this.delayFactor++  
            setTimeout( () => {
             this.placeOldMarker(location);
            this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);        
            }, this.delayFactor*350)       
        })
// marker and dirs on click
        google.maps.event.addListener(this.map, 'click', (event) => {
            this.delayFactor++  
            setTimeout( () => {
                this.placeMarker(event.latLng);
                this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);  
            }, this.delayFactor*350)   
        });  
    }
// removing marker from map and db. redrawing directions
    removeMarker(){
        if(this.markers === []) return;
        this.markers[this.markers.length - 1].setMap(null);
        this.markers.pop();
        this.routeData.path.pop();
        if(this.markers.length === 1){
            directionsDisplay.setMap(null);
            directionsDisplay = null;
        };
        
        this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
    }
// placing new markers and adding coord to db
     placeMarker(location) {
         let marker = new google.maps.Marker({
             position: location, 
             map: this.map
         });
         let markerLat = marker.getPosition().lat();
         let markerLng = marker.getPosition().lng();
         this.routeData.path.push({lat: markerLat, lng: markerLng})
         this.markers.push(marker)
    }
// placing existing markers
    placeOldMarker(location) {
        let marker = new google.maps.Marker({
            position: location, 
            map: this.map
        });
        this.markers.push(marker)
   }

    handleSubmit(e) {
        e.preventDefault();    
        this.props.openModal(this.props.modalWord)
    }

    updateFilter(event) {
        let input = event.target.value;       
        this.custTravelMode = input;
        if(input === 'WALKING'){
          this.routeInfo.activity = 'running'; 
        } else {
          this.routeInfo.activity = 'biking'
        }       
    }

    updateMapFilter(event) {    
         this.map.setMapTypeId(event.target.value);
    }

    hideSidebar() {
        return e => {
          let element = document.getElementById("routeform-tohide");
          element.classList.toggle('hidden')  
        }
      }

    render(){
        
        return(
            <div className="routeform-main">
                <Modal routeData={this.routeData} routeInfo={this.routeInfo}/>
                <div className ='routeform-header'>
                    <div className='greeting-left'>
                        <div className='greeting-logo-cont'>
                            <Link to='/dashboard'><img src={window.astra} className='routeform-logo'/> </Link>  
                        </div>
                        <h3>Routes</h3>
                    </div>
                    <div className='greeting-right' >
                        <div className='greeting-button' >
                        <Link to='/routes' className='routeform-header-link'> Back to My Routes </Link>  
                        </div>  
                    </div>
                </div>
                <div></div>
                <div className="routeform-search">
                    <button onClick={this.removeMarker}>Remove Marker</button>
                    <button onClick={this.handleSubmit}>Save</button>
                </div>
                <div className="routeform-sidebar">
                    <div className="routeform-sidebar-inner" id="routeform-tohide">
                        <h3>Routing preferences</h3>
                        
                            <select onChange={this.updateFilter}>
                                <option className="routeform-option" value="BICYCLING">Biking</option>
                                <option className="routeform-option" value="WALKING">Running</option>
                            </select>
                        
                        <h3>Map preferences</h3>
                        
                            <select onChange={this.updateMapFilter}>
                                <option className="routeform-option" value="roadmap">Standard</option>
                                <option className="routeform-option" value="satellite">Satellite</option>
                            </select>
                        
                    </div>
                    <div className="routeform-sidebar-arrow" onClick={this.hideSidebar()}>
                        <i className="fa fa-arrows-h" aria-hidden="true"></i>
                    </div>
                </div>
                <div className='routeform-container' ref='mapNode'></div>
                <div className ='routeform-footer'>
                    
                        <div>
                            <div className ='routeform-lab'>Distance</div>
                            <div className ='routeform-res'>{this.state.distance}</div>
                        </div>
                        <div>
                            <div className ='routeform-lab' >Estimated duration</div>
                            <div className ='routeform-res'>{this.state.estimated_duration}</div>
                        </div>
                  
                        <a className="fab fa-github fa-lg quick-fix" href="https://github.com/pauchye"></a>
                        <a className="fab fa-linkedin fa-lg quick-fix" href="https://www.linkedin.com/in/olga-smirnova-17b73b41/"></a>
                      
                </div>
                
            </div>
            
        )
    }
}


export default RouteForm;