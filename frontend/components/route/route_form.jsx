import React from 'react';
import Modal from '../modal/modal'


class RouteForm extends React.Component{
    constructor(props){
        debugger
        super(props);
        this.state = this.props.route;
        this.routeData = JSON.parse(props.route.route_data);
        this.markers = [];
        // this.route_path = this.routeData.path; //"path":[{"lat":0,"lng":0},{"lat":0,"lng":0}]
        this.dist = 0;
        this.dur = 0;
        this.custTravelMode = 'WALKING'
 
        this.routeInfo = {
            route_name: this.props.route.route_name, 
            description: this.props.route.description,
            activity: this.props.route.activity,
            road_type: this.props.route.road_type,
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
        let wayPoints = this.markers.slice(1, this.markers.length - 1 ).map(marker => ({location: marker.position, stopover: false})) || [];

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

                    this.dur += response.routes[0].legs[0].duration.value;
                    this.routeInfo.estimated_duration = this.dur;
                    // if(this.dur/60 > 60){
                    //     this.routeInfo.estimated_duration = (Math.floor(this.dur/60/60).toString()) + ' h ' + Math.floor((this.dur/60%60)).toString() + ' m'
                    // } else {
                    //     this.routeInfo.estimated_duration = Math.floor((this.dur/60)).toString() + ' m';
                    // }
                    
                    
                    if(this.routeData.path.length === 0){
                        this.routeData.path.push(start);
                        this.routeData.path.push(end);
                        this.routeData.lat = start.lat();
                        this.routeData.lng = start.lng();
                        // console.log('start.lat', start.lat())
                        // console.log('start.lng', start.lng())
                    //    console.log('this is this.routeData.path.',this.routeData.path)
                    } else {
                        this.routeData.path.push(end);
                        // console.log('this is route_path.',this.routeData.path)
                    }

                    console.log('ri:', this.routeInfo);
                    console.log('rd:', this.routeData);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });  
        }            
    }

    componentDidMount() {
        const mapOptions = {
          center: { lat: 40.779914, lng: -73.970519 }, 
          zoom: 13,
          mapTypeId: 'roadmap'
        };

        this.directionsService = new google.maps.DirectionsService(); 
        this.directionsDisplay = new google.maps.DirectionsRenderer(
            {suppressMarkers: true,
             polylineOptions: { strokeColor: "#FC4C02" } ,
             preserveViewport: true }
            ); 

        this.map = new google.maps.Map(this.refs.mapNode, mapOptions);
        this.directionsDisplay.setMap(this.map);
        window.googleMap = this.map;
        // arr.forEach 
        // 
        this.routeData.path.forEach(location => {
            this.placeMarker(location);
            this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay); 
        })

        google.maps.event.addListener(this.map, 'click', (event) => {
 
            this.placeMarker(event.latLng);
            this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  
        });

        
    }


     placeMarker(location) {
         let marker = new google.maps.Marker({
             position: location, 
             map: this.map
         });
        //  debugger
         this.markers.push(marker)
        //  console.log(marker)
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('this.routeData.path',this.routeData.path)
        

        this.props.openModal('save')
    }

    updateFilter(event) {
        let input = event.target.value;
        
        this.custTravelMode = input;
        if(input === 'WALKING'){
          this.routeInfo.activity = 'running' 
          console.log(this.routeInfo) 
        } else {
          this.routeInfo.activity = 'biking'
          console.log(this.routeInfo) 
        }
        
    }

    updateMapFilter(event) {
        // debugger
         this.map.setMapTypeId(event.target.value);
    }

    render(){
        let showDuration;
        if(this.routeInfo.estimated_duration/60 > 60){
            showDuration = (Math.floor(this.routeInfo.estimated_duration/60/60).toString()) + ' h ' + Math.floor((this.routeInfo.estimated_duration/60%60)).toString() + ' m'
        } else {
            showDuration = Math.floor((this.dur/60)).toString() + ' m';
        }
        return(
            <div >
                <Modal routeData={this.routeData} routeInfo={this.routeInfo}/>
                <div onClick={this.handleSubmit}>save</div>
                <div>this is mapform</div>
                <h3>Routing preferences</h3>
                <div>
                    <select onChange={this.updateFilter}>
                        <option value="BICYCLING">Biking</option>
                        <option value="WALKING">Running</option>
                    </select>
                    {/* <button onClick={() => {this.updateFilter('BICYCLING')}}> Biking </button>
                    <button onClick={this.updateFilter('WALKING')}> Running </button> */}
                </div>
                <h3>Map preferences</h3>
                <div>
                    <select onChange={this.updateMapFilter}>
                        <option  value="roadmap">Standard</option>
                        <option value="satellite">Satellite</option>
                    </select>
                    {/* <button onClick={this.updateMapFilter('roadmap')}> Standard </button>
                    <button onClick={this.updateMapFilter('satellite')}> Satellite </button> */}
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