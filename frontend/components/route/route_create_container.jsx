import { connect } from 'react-redux';
import RouteForm from './route_form';
import { createRoute } from '../../actions/route_actions'
import { openModal, closeModal, closeAndSaveModal } from '../../actions/modal_actions'

const mapStateToProps = state => {
    // debugger
    const userId = state.session.id;
    return {
      postType: 'Create Route',
      userId,
      modalWord: 'save',
      route: {
        // user_id: null,
        route_name: '',
        description: '',
        activity: 'biking',
        road_type: '',
        distance: '',
        estimated_duration: '',
        elevation: '',
        route_data: '{"lat": "", "lng": "", "zoom":"13", "route_coord":"", "path":[]}' // "path":[{"lat":0,"lng":0},{"lat":0,"lng":0}]
      }
    }
  }
  
const mapDispatchToProps = dispatch => {
    // debugger
    return {
        action: route => dispatch(createRoute(route)),
        closeModal: () => dispatch(closeModal()),
        closeAndSaveModal: () => dispatch(closeAndSaveModal),
        openModal: (smth) => dispatch(openModal(smth))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RouteForm);