// game state action creators
export const joinGame = (roomId) => {
	return {
		type: 'JOIN_GAME',
		payload: roomId
	};
}

export const cannotJoinRoom = () => {
	return {
		type: 'CANNOT_JOIN_ROOM',
		payload: ''
	};
}

export const joinedRoom = (roomId) => {
	return {
		type: 'JOINED_ROOM',
		payload: roomId
	};
}

export const roomComplete = () => {
	return {
		type: 'ROOM_COMPLETE',
		payload: 'WAITING_FOR_READY'
	};
}

export const setReady = () => {
	return {
		type: 'SET_READY',
		payload: ''
	};
}

export const allReady = () => {
	return {
		type: 'ALL_READY',
		payload: 'IN_GAME_CHOOSING'
	};
}
