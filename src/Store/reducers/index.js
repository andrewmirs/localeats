import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reviews from './reviews';

const rootReducer = combineReducers({
    form: formReducer,
    reviews
});

export default rootReducer;