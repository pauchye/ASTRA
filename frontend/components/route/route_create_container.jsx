import { connect } from 'react-redux';
import RouteForm from './route_form';
import { createRoute } from '../../actions/route_actions'

const mapStateToProps = state => {
    // debugger
    return {
      route: {
        // user_id: null,
        route_name: '',
        description: '',
        activity: '',
        road_type: '',
        distance: '',
        estimated_duration: '',
        elevation: '',
        route_data: '{"lat": "", "lng": "", "zoom":""}'
      }
    }
  }
  
const mapDispatchToProps = dispatch => {
    // debugger
    return {
        action: route => dispatch(createRoute(route))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RouteForm);