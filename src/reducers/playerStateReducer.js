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
		case 'SET_MATCH_RESULT':
			// Match Result should be different from round result
			const results = action.payload;
			if(results.own.result === 'win') {
				nextState.own.score += 1;
			}
			else if(results.own.result === 'lose') {
				nextState.opponent.score += 1;
			}
			nextState.opponent.handSign = results.opponent.choice;
			return nextState;
		case 'SET_ROUND_RESULT':
			const roundResults = action.payload;
			if(roundResults.own.result === 'win') {
				nextState.own.score += 1;
			}
			else if(roundResults.own.result === 'lose') {
				nextState.opponent.score += 1;
			}
			return nextState;
		case 'NEXT_ROUND':
			nextState.own.handSign = 'none';
			nextState.opponent.handSign = 'none';
			return nextState;
		case 'EXIT_MATCH':
			nextState.handSign = 'none';
			nextState.score = 0;
			return nextState;
		default:
			break;
	}
	return state;
}
