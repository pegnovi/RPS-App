// takes in actions, reduces them to functions
export default function(state = null, action) {
	switch(action.type){
		case 'ROCK_SIGN_CLICKED':
			// return {
			// 	handsign: 'rock'
			// }
			console.log(state)
			console.log('-----------')
			console.log(action)
			return action.payload;
		default:
			break;
	}
	return state;
}
