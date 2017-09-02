import { cloneDeep } from 'lodash';

export default function(
	state = {
		opponent: {
			handSign: 'none',
			score: 0,
			wins: 0,
			losses: 0
		},
		own: {
			handSign: 'none',
			score: 0,
			wins: 0,
			losses: 0
		}
	},
	action) {

	const nextState = cloneDeep(state);
	switch(action.type){
		case 'HANDSIGN_SELECTED':
			nextState.own.handSign = action.payload;
			return nextState;
		case 'RESET_HAND_SIGNS':
			console.log(action.payload);
			nextState.opponent.handSign = action.payload;
			nextState.own.handSign = action.payload;
			return nextState;
		case 'SET_MATCH_RESULT':
			// Match Result should be different from round result
			const results = action.payload;
			nextState.own.score = results.own.score;
			nextState.opponent.score = results.opponent.score;
			nextState.opponent.handSign = results.opponent.choice;
			return nextState;
		case 'SET_ROUND_RESULT':
			const roundResults = action.payload;
			nextState.own.score = roundResults.own.score;
			nextState.opponent.score = roundResults.opponent.score;
			nextState.opponent.handSign = roundResults.opponent.choice;
			return nextState;
		case 'EXIT_MATCH':
			nextState.own.handSign = 'none';
			nextState.opponent.handSign = 'none';
			nextState.own.score = 0;
			nextState.opponent.score = 0;
			return nextState;
		default:
			break;
	}
	return state;
}
