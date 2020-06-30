import { connect } from 'react-redux';
import RouteForm from './route_form';
import { fetchRoute, updateRoute } from '../../actions/route_actions';
import { openModal, closeModal, closeAndSaveModal } from '../../actions/modal_actions';
import React from 'react';

class EditRouteForm extends React.Component {
    componentDidMount(){
        this.props.fetchRoute(this.props.match.params.routeId)
    }

    render(){
        const { postType, userId, route, fetchRoute, action, closeModal, closeAndSaveModal, openModal, modalWord} = this.props;
        
        if(!route) return null;
        return (
            < RouteForm
            postType = {postType} 
            userId = {userId}
            fetchRoute = {fetchRoute}
            action = {action}
            closeModal = {closeModal}
            closeAndSaveModal = {closeAndSaveModal}
            openModal = {openModal}
            route = {route}
            modalWord = {modalWord}
            />
        )        
    }
}

const mapStateToProps = (state, ownProps) => {
    
    const userId = state.session.id;
    return {
      postType: 'Update Route',
      userId,
      route: state.entities.routes[ownProps.match.params.routeId],
      modalWord: 'update'
    }
  }
  
const mapDispatchToProps = dispatch => {
    
    return {
        fetchRoute: routeId => dispatch(fetchRoute(routeId)),
        action: route => dispatch(updateRoute(route)),
        closeModal: () => dispatch(closeModal()),
        closeAndSaveModal: () => dispatch(closeAndSaveModal),
        openModal: (smth) => dispatch(openModal(smth))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(EditRouteForm);