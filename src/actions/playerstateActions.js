// game state action creators
// export const startGame = () => {
// 	return {
// 		type: 'PLAYER_START_GAME',
// 		payload: 'WAITING_FOR_OPPONENT'
// 	}
// }

// action creator for all handsign types
export const playHandSign = (state) => {
	const type = 'HANDSIGN_SELECTED';
	return {
		type: type,
		payload: state
	};
}

