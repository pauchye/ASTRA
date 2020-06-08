import { connect } from 'react-redux';
import RouteShowMap from './route_show_map';
import { fetchRoute } from '../../actions/route_actions';

const mdtp = dispatch => ({
    fetchRoute: routeId => dispatch(fetchRoute(routeId))
})

export default connect(null, mdtp)(RouteShowMap)