export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
// export const CHECK_EMAIL = 'CHECK_EMAIL'
import { signUp, logIn, logOut } from '../util/session_api_util'//, checkDbEmail

export const receiveCurrentUser = (currentUser) => {
    return{
        type: RECEIVE_CURRENT_USER,
        currentUser
    }
}

export const logoutCurrentUser = () => {
    return{
        type: LOGOUT_CURRENT_USER,
    }
}

export const receiveSessionError = (errors) => {
    // debugger
    return{
        type: RECEIVE_SESSION_ERRORS,
        errors
    }
}

export const signup = formUser => dispatch => (
    signUp(formUser).then(user => dispatch(receiveCurrentUser(user)), 
    error => dispatch(receiveSessionError(error.responseJSON))
    )
)

export const login = formUser => dispatch => {
    // debugger
    // console.log(logIn(formUser))
    return logIn(formUser).then(user => dispatch(receiveCurrentUser(user)), 
    error => dispatch(receiveSessionError(error.responseJSON))
    )
}
    
export const logout = () => dispatch => (
    logOut().then(user => dispatch(logoutCurrentUser()), 
    error => dispatch(receiveSessionError(error.responseJSON))
    )
)

// const checkEmail = (bool) => {
//     return {
//         type: CHECK_EMAIL,
//         bool
//     }
// }

// export const checkUserEmail = formUser => dispatch => {
//     return checkDbEmail(formUser).then(bool => {
//         return dispatch(checkEmail(bool))
//     }), error => {
//         return dispatch(receiveSessionError(error.responseJSON))
//     };
// }

