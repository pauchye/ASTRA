import React from 'react';
import Modal from '../modal/modal'


class RouteForm extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.route;
        this.routeData = JSON.parse(props.route.route_data);
        // console.log(this.routeData)
        this.markers = [];
        this.route_path = this.routeData.path; //"path":[{"lat":0,"lng":0},{"lat":0,"lng":0}]
        this.dist = 0;
        this.dur = 0;
        this.custTravelMode = 'WALKING'
        // this.custBasemap = 'roadmap'
        this.routeInfo = {
            route_name: this.props.route.route_name, 
            description: this.props.route.description,
            activity: this.props.route.activity,
            road_type: this.props.route.activity,
            distance: this.props.route.distance,
            estimated_duration: this.props.route.estimated_duration,
            elevation: this.props.route.elevation
        }
        this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateMapFilter = this.updateMapFilter.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay) {
        console.log('last marker', this.markers[this.markers.length - 1].position);
        let wayPoints = this.markers.slice(1, this.markers.length - 1 ).map(marker => ({location: marker.position, stopover: false})) || [];
        // console.log(wayPoints)
        if(this.markers.length > 1) {
            console.log('travel mode:', this.custTravelMode);

            directionsService.route({
                origin: this.markers[0].position,
                waypoints: wayPoints,
                destination: this.markers[this.markers.length - 1].position,
                travelMode: this.custTravelMode
            }, (response, status) => {
                console.log('this is response',response)
                if (status === 'OK') {  
                    directionsDisplay.setDirections(response);
                    let start = response.routes[0].legs[0].start_location;
                    let end = response.routes[0].legs[0].end_location;
                    this.dist += response.routes[0].legs[0].distance.value;
                    this.dur += response.routes[0].legs[0].duration.value;
                    
                    // console.log('this is this',this)
                    console.log('this is dist',this.dist)
                    console.log('this is dur', this.dur)
                    // console.log('this is start',response.routes[0].legs[0].start_location) // {
                    //     "lat": 41.8507300,
                    //     "lng": -87.6512600
                    //   }
                    console.log('this is end',response.routes[0].legs[0].end_location)
                    if(this.route_path.length === 0){
                       this.route_path.push(start);
                       this.route_path.push(end);
                       console.log('this is route_path.',this.route_path)
                    } else {
                        this.route_path.push(end);
                        console.log('this is route_path.',this.route_path)
                    }
                    // debugger
                    // response.routes[0].legs[0]/start_location/end_location
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });  
        }            
    }

    componentDidMount() {
        const mapOptions = {
          center: { lat: 40.779914, lng: -73.970519 }, // this is NYC
          zoom: 13,
          mapTypeId: 'roadmap'
        };

        this.directionsService = new google.maps.DirectionsService(); //???
        this.directionsDisplay = new google.maps.DirectionsRenderer(
            {suppressMarkers: true,
             polylineOptions: { strokeColor: "#FC4C02" } ,
             preserveViewport: true }
            ); //???

        this.map = new google.maps.Map(this.refs.mapNode, mapOptions);
        this.directionsDisplay.setMap(this.map);
        window.googleMap = this.map;

        google.maps.event.addListener(this.map, 'click', (event) => {
 
            this.placeMarker(event.latLng);
            this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
            console.log(this.markers)
        });

        
    }


     placeMarker(location) {
         let marker = new google.maps.Marker({
             position: location, 
             map: this.map
         });
        //  debugger
         this.markers.push(marker)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.openModal('save')
    }

    updateFilter(input) {
        this.custTravelMode = input;
        if(input === 'WALKING'){
          this.routeInfo = 'running'  
        } else {
          this.routeInfo = 'biking'
        }
        
    }

    updateMapFilter(input) {
        // debugger
        return () => this.map.setMapTypeId(input)
        // debugger
        // this.custBasemap = input;
    }

    render(){

        return(
            <div >
                <Modal routeData={this.routeData} routeInfo={this.routeInfo}/>
                <div onClick={this.handleSubmit}>save</div>
                <div>this is mapform</div>
                <h3>Routing preferences</h3>
                <div>
                    <select >
                        <option onClick={() => {this.updateFilter('BICYCLING')}} value="Biking">Biking</option>
                        <option onClick={() => {this.updateFilter('WALKING')}} value="Running">Running</option>
                    </select>
                    {/* <button onClick={() => {this.updateFilter('BICYCLING')}}> Biking </button>
                    <button onClick={this.updateFilter('WALKING')}> Running </button> */}
                </div>
                <h3>Map preferences</h3>
                <div>
                    {/* <select >
                        <option onClick={() => {this.updateMapFilter('roadmap')}} value="roadmap">Standard</option>
                        <option onClick={() => {this.updateMapFilter('satellite')}} value="satellite">Satellite</option>
                    </select> */}
                    <button onClick={this.updateMapFilter('roadmap')}> Standard </button>
                    <button onClick={this.updateMapFilter('satellite')}> Satellite </button>
                </div>
                <div className='routeform-container' ref='mapNode'></div>
                <label> Distance 

                </label>
                <label> Estimated  

                </label>
            </div>
            
        )
    }
}


export default RouteForm;