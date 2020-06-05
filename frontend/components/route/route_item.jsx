import React from 'react';


class RouteItem extends React.Component{
    constructor(props){
        // debugger
        super(props);
        this.routeData = JSON.parse(props.route.route_data);
        // console.log('route data:', this.routeData);
    }

    componentDidMount() {
        // debugger
        // set the map to show SF
        const mapOptions = {
        //   center: { lat: 37.7758, lng: -122.435 }, // this is SF
          center: { lat: this.routeData.lat, lng: this.routeData.lng }, // this is SF
          zoom: this.routeData.zoom
        //   zoom: 13
        };
        // debugger
        // wrap this.mapNode in a Google Map
        this.map = new google.maps.Map(this.refs.mapNode, mapOptions);
       
        // this.MarkerManager.updateMarkers(this.props.benches)
    }

    render(){
        // debugger
        let data = this.props.route.created_at.split("T")[0]// 2020-06-04T15:37:57.143Z
        return(
            <div >
                <div></div>
                <div className='routeitem-container' ref='mapNode'></div>
                <div>{this.props.route.route_name}</div>
                <label>
                    <div>{this.props.route.distance} mi</div>
                    Distance
                </label>
                <label>
                    <div>{this.props.route.elevation} ft</div>
                    Elevation gain
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