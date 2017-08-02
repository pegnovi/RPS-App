export default socket => store => next => action => {
	console.log('in middleware', action);
	// if(action.meta && action.meta.remote) {
	// 	socket.emit('action', action);
	// }

	if(action.type === 'JOIN_GAME') {

	}

	return next(action);
}
