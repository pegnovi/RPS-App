import { cloneDeep } from 'lodash';

export default function(
	state = {
		opponent: {
			handSign: '',
			wins: 0,
			losses: 0
		},
		own: {
			handSign: '',
			wins: 0,
			losses: 0
		}
	},
	action) {
	switch(action.type){
		case 'HANDSIGN_SELECTED':
			const nextState = cloneDeep(state);
			nextState.own.handSign = action.payload;
			return nextState;
		default:
			break;
	}
	return state;
}
