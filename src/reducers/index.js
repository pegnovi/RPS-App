import {combineReducers} from 'redux';
import HandsignReducer from './handsignReducer';
import PlayerstateReducer from './playerstateReducer';

const allReducers = combineReducers({
	handsign: HandsignReducer,
	playerstate: PlayerstateReducer
});

export default allReducers;
