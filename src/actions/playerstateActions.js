// would socket connection go here?
export const startGame = () => {
	return {
		type: 'PLAYER_START_GAME',
		payload: 'WAITING_FOR_OPPONENT'
	}
}
