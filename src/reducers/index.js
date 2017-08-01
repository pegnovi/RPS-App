import {combineReducers} from 'redux';
import HandsignReducer from './handsignReducer';
import PlayerstateReducer from './playerstateReducer';

import GameStateReducer from './gameStateReducer';

const allReducers = combineReducers({
	handsign: HandsignReducer,
	playerstate: PlayerstateReducer,
	gameState: GameStateReducer
});

export default allReducers;
