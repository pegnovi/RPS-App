// takes in  gamestate actions, reduces them to functions
export default function(state = 'PLAYER_INIT', action) {
	switch(action.type){
		case 'PLAYER_LOBBY':
		case 'PLAYER_WAITING':
		case 'PLAYER_START_GAME':
			return action.payload;
		default:
			break;
	}
	return state;
}
