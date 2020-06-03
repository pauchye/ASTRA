export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
import { signUp, logIn, logOut } from '../util/session_api_util'

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
    return{
        type: RECEIVE_SESSION_ERRORS,
        errors
    }
}

export const signup = formUser => dispatch => (
    signUp(formUser).then(user => (
        dispatch(receiveCurrentUser(user))
    )), error => (
        dispatch(receiveError(error.responseJSON))
    )
)

export const login = formUser => dispatch => {
    // debugger
    console.log(logIn(formUser))
    return logIn(formUser).then(user => {
        // debugger
        return dispatch(receiveCurrentUser(user)) 
    }
    ), error => (
        dispatch(receiveSessionError(error.responseJSON))
    )
}
    


export const logout = () => dispatch => (
    logOut().then(user => (
        dispatch(logoutCurrentUser())
    )), error => (
        dispatch(receiveError(error.responseJSON))
    )
)

