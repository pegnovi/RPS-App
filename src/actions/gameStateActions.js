// game state action creators
export const joinGame = () => {
	return {
		type: 'JOIN_GAME',
		payload: 'WAITING_FOR_OPPONENT'
	}
}

export const roomComplete = () => {
	return {
		type: 'ROOM_COMPLETE',
		payload: 'WAITING_FOR_READY'
	}
}

export const setReady = () => {
	return {
		type: 'SET_READY',
		payload: ''
	}
}

export const allReady = () => {
	return {
		type: 'ALL_READY',
		payload: 'IN_GAME_CHOOSING'
	}
}
