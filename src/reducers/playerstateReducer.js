// takes in actions, reduces them to functions
// DOESNT ACTUALLY DO ANYTHING RIGHT NOW
export default function(state = 'PLAYER_INIT', action) {
	switch(action.type){
		case 'PLAYER_LOBBY':
			return action.payload;
		case 'PLAYER_WAITING':
			return action.payload;
		case 'PLAYER_START_GAME':
			return action.payload;
		default:
			break;
	}
	return state;
}
