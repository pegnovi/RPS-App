import {combineReducers} from 'redux';
import PlayerStateReducer from './playerStateReducer';
import GameStateReducer from './gameStateReducer';

const allReducers = combineReducers({
	playerstate: PlayerStateReducer,
	gameState: GameStateReducer
});

export default allReducers;
