import {combineReducers} from 'redux';
import HandsignReducer from './handsignReducer';
import GamestateReducer from './gamestateReducer';

const allReducers = combineReducers({handsign: HandsignReducer, gamestate: GamestateReducer})

export default allReducers;
