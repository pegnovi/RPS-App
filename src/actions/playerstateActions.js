// game state action creators
export const startGame = () => {
	return {
		type: 'PLAYER_START_GAME',
		payload: 'WAITING_FOR_OPPONENT'
	}
}
