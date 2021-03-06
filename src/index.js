import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';

import * as playerStateActionCreators from './actions/playerStateActions';
import * as gameAndPlayerStateActionCreators from './actions/gameAndPlayerStateActions';
import * as gameStateActionCreators from './actions/gameStateActions';

import allReducers from './reducers';
import socketActionMiddleware from './middleware/socketActionMiddleware';

import { connect } from './tools/webSocket';

const socket = connect();
const createStoreWithMiddleware = applyMiddleware(socketActionMiddleware(socket))(createStore);

const store = createStoreWithMiddleware(
	allReducers,
	/* FOR USE WITH REDUX-DEV-TOOLS https://github.com/zalmoxisus/redux-devtools-extension#usage */
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

socket.on('test', function() {
	console.log('test');
});
socket.on('Cannot Join Room', function() {
	store.dispatch(gameStateActionCreators.cannotJoinRoom());
});
socket.on('Joined Room', function(data) {
	store.dispatch(gameStateActionCreators.joinedRoom(data.roomId));
});
socket.on('Room Complete', function() {
	store.dispatch(gameStateActionCreators.roomComplete());
});
socket.on('Start Game', function() {
	store.dispatch(gameStateActionCreators.allReady());
});

socket.on('Game Results', function(results) {
	console.log(results);
	store.dispatch(gameAndPlayerStateActionCreators.setMatchResult(results));
});

socket.on('Round Over', function(results) {
	console.log(results);
	store.dispatch(gameAndPlayerStateActionCreators.setRoundResult(results));
	setTimeout(function() {
		store.dispatch(playerStateActionCreators.resetHandSigns());
		store.dispatch(gameStateActionCreators.setReady());
	}, 3000)

});

// Opponent might forfeit during 'Round Over' setTimout call so the state will be changed
// Temporary fix is to not trigger socket emit to server when state is OPPONENT_FORFEIT
// This only works because SET_READY only triggers a socket emit and does not modify state
// Need a better solution that isn't tightly coupled
// Possible solution:
//  - Get handle of setTimeout call and do clearTimeout(handle)
//    (would need to store setTimeout handle though)
socket.on('Opponent Forfeit', function() {
	console.log('opponent forfeit');
	store.dispatch(gameAndPlayerStateActionCreators.opponentForfeit());
});

socket.on('Time Over', function() {
	console.log('TIME OVER');
	const handsign = store.getState().playerState.own.handSign;
	store.dispatch(gameAndPlayerStateActionCreators.resolveMatch(handsign));
	// socket.emit('Choice', {choice: handsign});
});
// socket.on('Next Round', function() {
// 	choice = '';
// 	socket.emit('ready');
// });

// hook up socket context to middleware for redux
registerServiceWorker();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
