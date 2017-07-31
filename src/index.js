import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { connect } from './tools/webSocket';

const socket = connect();
socket.emit('start game');

// add socket event handlers here

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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
