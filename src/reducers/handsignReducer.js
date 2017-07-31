// takes in actions, reduces them to functions
export default function(state = null, action) {
	switch(action.type){
		case 'ROCKETLAUNCHER_SIGN_CLICKED':
		case 'PAPER_SIGN_CLICKED':
		case 'SCISSOR_SIGN_CLICKED':
		case 'ROCK_SIGN_CLICKED':
			return action.payload;
		default:
			break;
	}
	return state;
}
