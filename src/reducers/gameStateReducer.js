import { cloneDeep } from 'lodash';

// takes in  gamestate actions, reduces them to functions
export default function(
	state = {
		state: 'LOBBY',
		round: 0,
		maxRounds: 3,
		matchResult: '',
		maxScore: 3
	},
	action) {

	const nextState = cloneDeep(state);
	switch(action.type){
		case 'JOIN_GAME':
			nextState.state = action.payload;
			return nextState;
		case 'ROOM_COMPLETE':
			nextState.state = action.payload;
			return nextState;
		case 'SET_READY':
			return nextState;
		case 'ALL_READY':
			nextState.state = action.payload;
			return nextState;
		case 'SET_MATCH_RESULT':
			const results = action.payload;
			if(results.own.result !== 'tie') {
				nextState.round += 1;
			}
			nextState.matchResult = results.own.result;
			nextState.state = 'GAME_OVER';
			return nextState;
		case 'SET_ROUND_RESULT':
			const roundResults = action.payload;
			if(roundResults.own.result !== 'tie') {
				nextState.round += 1;
			}
			nextState.matchResult = roundResults.own.result;
			nextState.state = 'ROUND_OVER';
			return nextState;
		case 'NEXT_ROUND':
			nextState.state = 'IN_GAME_CHOOSING';
			return nextState;
		case 'OPPONENT_FORFEIT':
			nextState.state = 'OPPONENT_FORFEIT';
			return nextState;
		case 'EXIT_MATCH':
			nextState.state = 'LOBBY';
			nextState.round = 0;
			nextState.matchResult = '';
			return nextState;
			break;
		default:
			break;
	}
	return state;
}
