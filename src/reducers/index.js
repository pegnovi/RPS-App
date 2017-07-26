import {combineReducers} from 'redux';
import HandsignReducer from './handsignReducer';

const allReducers = combineReducers({handsign: HandsignReducer})

export default allReducers;
