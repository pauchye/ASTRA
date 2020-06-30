import { connect } from 'react-redux';
import RouteIndex from './route_index';
import { fetchUsersRoutes, fetchRoutes } from '../../actions/route_actions'

const mapStateToProps = state => {
    
    return {
      routes: Object.values(state.entities.routes),
      users: state.entities.users,
      session: state.session
    }
  }
  
const mapDispatchToProps = dispatch => {
    
    return {
        fetchUsersRoutes: (userId) => dispatch(fetchUsersRoutes(userId))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RouteIndex);