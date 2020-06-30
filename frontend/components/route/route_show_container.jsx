import { connect } from 'react-redux';
import { fetchRoute, deleteRoute } from '../../actions/route_actions';
import RouteShow from './route_show'

const mstp = (state, ownProps) => {
    
    return {
        route: state.entities.routes[ownProps.match.params.routeId],
        currentUser: state.entities.users[state.session.id]
    }
}

const mdtp = dispatch => {
    return {
        fetchRoute: RouteId => dispatch(fetchRoute(RouteId)),
        deleteRoute: RouteId => dispatch(deleteRoute(RouteId))
    }
}

export default connect(mstp, mdtp)(RouteShow)
