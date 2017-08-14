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


// socket.on('Round Start', function() {
// 	console.log('ROUND HAS STARTED! MAKE A CHOICE');
// });
// socket.on('Time Over', function() {
// 	console.log('TIME OVER');
// 	// if(!choice) {
// 	// 	choice = 'none';
// 	// }
// 	// socket.emit('Choice', {choice: choice});
// });
// socket.on('Next Round', function() {
// 	choice = '';
// 	socket.emit('ready');
// });

// hook up socket context to middleware for redux

// Store state
/*
{
	gameState: {
		state: <string>,
		players: {
			opponent: {
				choice/handsign: <string>
			},
			me: {
				choice/handsign: <string>
			}
		}
	},
	playerStatus: {
		wins: <number>,
		losses: <number>
	}
}
// Conditional component rendering based on game.state
*/


registerServiceWorker();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
