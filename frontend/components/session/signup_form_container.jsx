import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../../actions/session_actions'

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'Sign Up',
        otherFormType: 'Log In',
        otherFormLink: '/login',
        formHeader: "Join Astra today, it's Free!"
    }
}

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)) //smth else (user) => dispatch(checkEmail(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)