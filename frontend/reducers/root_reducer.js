import { combineReducers } from 'redux';
import session from './session/session_reducer';
import errors from './errors/errors_reducer';
import entities from './entities_reducer';
import ui from './ui/ui_reducer';

const rootReducer = combineReducers({
    entities,
    session,
    errors,
    ui
})

export default rootReducer;