import React from 'react';
import RouteItem from './route_item';
import { Link } from 'react-router-dom'

class RouteIndex extends React.Component {
    constructor(props) {
      // debugger
        super(props);
        this.user_id = props.session.id;
        this.state = {routeActivity: 'biking', ...this.props.routes};
      }

    componentDidMount() {
      // request benches from your API here
      // debugger
      this.props.fetchUsersRoutes(this.user_id);
    }

    updateFilter(input) {
      // debugger;
      return e => {
        this.setState({routeActivity: input})
        let biking = document.getElementById("css-b");
        let walking = document.getElementById("css-w");
        biking.classList.toggle('route-ind-toggle')
        walking.classList.toggle('route-ind-toggle')

      }
    }
  
    render() {
        // debugger;
      const { routes } = this.props;
    //   debugger
      let filteredRoute = routes.filter(route => route.activity === this.state.routeActivity)
      console.log(routes);
      console.log(this.state.routeActivity);
      console.log(filteredRoute);
      return (
        <div className="route-ind-container">
          <div className="route-ind-1">
            <div className="route-ind-head-left">
                <h1>My Routes</h1>
                <Link to='/routes/new' className='route-ind-link' >Create New Route</Link>
            </div>
            <div className="route-ind-head-right">
                <div> 
                  <div>Get Strava Routes on your Garmin device.</div>
                  <a href="https://support.strava.com/hc/en-us/articles/115000919304">Learn how.</a>
                </div>
                <img src={window.desktop} />
            </div>
          </div>
          <div className="route-ind-2">

          {/* <label for="biking-css" onClick={this.updateFilter('biking')} className="route-ind-but"> Biking 
           <input type="checkbox" id="biking-css" />
          </label>
          <label for="running-css" onClick={this.updateFilter('running')}className="route-ind-but"> Running 
            <input type="checkbox" id="running-css" />
          </label> */}
          <button onClick={this.updateFilter('biking')} className="route-ind-but route-ind-toggle" id="css-b"> Biking </button>
          <button onClick={this.updateFilter('running')} className="route-ind-but" id="css-w"> Running </button>

          </div>
          <div className="route-ind-3">
          <ul className="route-ind-ul">
            {
              filteredRoute.map(route => (
                <RouteItem
                className="route-ind-li"
                key={`route${route.id}`}
                route={route}
               />
                )
              )
            }
          </ul>
          </div>
        </div>
      )
    }
  }

  export default RouteIndex;