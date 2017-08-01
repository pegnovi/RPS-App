// takes in actions, reduces them to functions
// // do i really need 3 seperate actions here?
export default function(state = null, action) {
	switch(action.type){
		case 'HANDSIGN_SELECTED':
			return action.payload;
		default:
			break;
	}
	return state;
}
