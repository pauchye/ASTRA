import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import SaveRouteContainer from '../route/save_route_container';

class Modal extends React.Component {
  constructor(props){
    super(props);
    debugger
  }
  render(){
    const { closeModal, modal, routeData, routeInfo } = this.props;
    if (!modal) {
      return null;
    }

    let component;
    switch (modal) {
      case 'save':
        component = <SaveRouteContainer routeData={routeData} routeInfo={routeInfo}/>;
        break;
      default:
        return null;
    }
    return (
      <div className="modal-background" onClick={closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          { component }
        </div>
      </div>
    );  
  }
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
