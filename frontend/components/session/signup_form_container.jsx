import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../../actions/session_actions'

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'Sign Up',
        otherFormType: 'Log In',
        otherFormLink: '/login'
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)) //smth else
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)