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
      this.props.fetchUsersRoutes(this.user_id);
    }

    updateFilter(input) {
      // debugger;
      return e => {
        console.log('upd:', input)
        this.setState({routeActivity: input})
      }
      // console.log(this.state)
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
        <div>
          <div>
              <h1>My Routes</h1>
              <Link to='/routes/new'>Create New Route</Link>
          </div>
          <div>
              <div>Get Strava Routes on your Garmin device. Learn how.</div>
              <div>picture</div>
          </div>
          <button onClick={this.updateFilter('biking')}> Biking </button>
          <button onClick={this.updateFilter('running')}> Running </button>
          <ul>
            {
              filteredRoute.map(route => (
                <RouteItem
                key={`route${route.id}`}
                route={route}
               />
                )
              )
            }
          </ul>
        </div>
      )
    }
  }

  export default RouteIndex;