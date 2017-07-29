// takes in actions, reduces them to functions
export default function(state = null, action) {
	switch(action.type){
		case 'PAPER_SIGN_CLICKED':
		case 'SCISSOR_SIGN_CLICKED':
		case 'ROCK_SIGN_CLICKED':
			console.log('action', action);
			return action.payload;
		default:
			break;
	}
	console.log('state', state);
	return state;
}
