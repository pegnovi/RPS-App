// takes in  gamestate actions, reduces them to functions
export default function(state = 'LOBBY', action) {
	switch(action.type){
		case 'JOIN_GAME':
			return action.payload;
		case 'ROOM_COMPLETE':
			return action.payload;
		case 'ALL_READY':
			return action.payload;

		default:
			break;
	}
	return state;
}
