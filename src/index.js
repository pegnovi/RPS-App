import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import allReducers from './reducers';

import { connect } from './tools/webSocket';

const store = createStore(
	allReducers,
	/* FOR USE WITH REDUX-DEV-TOOLS https://github.com/zalmoxisus/redux-devtools-extension#usage */
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//console.log('INITIAL APP STATE:', store.getState());



// const socket = connect();

// add socket event handlers here
// var choice = '';
// $('#joinGame').click(function() {
// 	socket.emit('join game');
// });
// $('#ready').click(function() {
// 	socket.emit('ready');
// });
// socket.on('Room Complete', function() {
// 	console.log('Room Complete');
// 	showRPS();
// });
// socket.on('Start Game', function() {
// 	console.log('GAME HAS STARTED!!!')
// });
// socket.on('Round Start', function() {
// 	console.log('ROUND HAS STARTED! MAKE A CHOICE');
// });
// socket.on('Time Over', function() {
// 	console.log('TIME OVER');
// 	if(!choice) {
// 		choice = 'none';
// 	}
// 	socket.emit('Choice', {choice: choice});
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
