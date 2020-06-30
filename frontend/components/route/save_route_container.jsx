import { connect } from 'react-redux';
import SaveRoute from './save_route';
import { createRoute } from '../../actions/route_actions'
import { openModal, closeModal, closeAndSaveModal } from '../../actions/modal_actions'

const mapStateToProps = state => {
    
    const userId = state.session.id;
    return {
      userId,
      errors: state.errors.routes //to add!!
    }
  }
  
const mapDispatchToProps = dispatch => {
    
    return {
        action: route => dispatch(createRoute(route)),
        closeModal: () => dispatch(closeModal()),
        closeAndSaveModal: () => dispatch(closeAndSaveModal()),
        openModal: (smth) => dispatch(openModal(smth))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SaveRoute);