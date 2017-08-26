export default socket => store => next => action => {
	console.log('in middleware', action);
	// if(action.meta && action.meta.remote) {
	// 	socket.emit('action', action);
	// }

	// gameState
	if(action.type === 'JOIN_GAME') {
		socket.emit('join game', {roomId: action.payload});
	}
	else if(action.type === 'SET_READY') {
		if(store.getState().gameState.state !== 'OPPONENT_FORFEIT') {
			socket.emit('ready');
		}
	}
	else if(action.type === 'RESOLVE_MATCH') {
		socket.emit('choice', {choice: action.payload});
	}

	return next(action);
}
