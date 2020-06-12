# Astra

[Astra](https://astrava.herokuapp.com/#/) is a clone of [Strava](https://www.strava.com/)
This is a website to track outdoor activity that allowes a user to create routes on google maps and create workouts.

# Technologies 
Technologies stack: 
- Ruby on Rails, 
- PostgreSQL database, 
- JavaScript, 
- React,
- Redux.
Api:
- Google Maps Api,
- Google Directions Api.

# Features 
## Routes
- Biulding a route with multiple waypoints,
- Editing an existing route,
- Removing marker on click,
- Dynamicaly calculating distance adding or removing a marker.
```
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
                    if(this.routeData.path.length === 0){
                        this.routeData.path.push(start);
                        this.routeData.path.push(end);
                        this.routeData.lat = start.lat();
                        this.routeData.lng = start.lng();
                    } else {
                        this.routeData.path.push(end);
                    }
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });  
        }            
    }
 ```
## Workouts 
- Filter workouts by a key word with debounsing,
```
function debounce(fn, time) {
    let timeoutHandle = null;
    let lastArgs = null;
  
    return function(...args) {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
      const that = this;
      lastArgs = args;
      timeoutHandle = setTimeout(() => {
        fn.apply(that, lastArgs);
      }, time);
    }
  }
  ```
  ```
  updateFilter(event) {
        event.persist();
        if(!this.debounced) {
            this.debounced = debounce(() => {
                    this.setState({filter: event.target.value})
             }, 600);
        }
        this.debounced();
    }
    ```
