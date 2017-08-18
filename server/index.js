const _ = require('lodash');

const Server = require('socket.io');

const app = require('./app');

const PORT = 9000;

const uuidv4 = require('uuid/v4');

const server = app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});

//const io = new Server().attach(8090);
const io = require('socket.io')(server);
var helpers = require('./tools/socketHelpers')(io);


function joinRoom(socket) {
	var roomName = helpers.findVacantRoom();
	if(!roomName) {
		roomName = uuidv4();
	}

	// Join Room
	socket.join(roomName);

	const room = helpers.getRoom(roomName);

	// Setup gameState
	const gameState = helpers.setupGameStateIfNone(room);
	gameState.addSocketState(socket.id);

	console.log('roomName: ', roomName);
	return {
		roomName,
		room
	};
}

function joinGame(socket) {
	// Ensure socket isn't already in another room
	if(!helpers.socketIsInRoom(socket)) {
		console.log('joinGame: ', socket.id);

		const roomData = joinRoom(socket);

		if(roomData.room.length === 2) {
			io.in(roomData.roomName).emit('Room Complete');
		}
	}
	else {
		console.log('socket already in room!');
	}
}


io.on('connection', function(socket) {
	console.log('client connected: ', socket.id);

	console.log('Game Rooms: ', helpers.getGameRooms());

	socket.emit('test');

	socket.on('join game', function() {
		joinGame(socket);
	});
	socket.on('ready', function() {
		console.log('ready: ', socket.id);
		// Find room this socket is in
		const roomData = helpers.getSocketRoomData(socket);
		const gameState = (roomData.room) ? roomData.room.gameState : null;

		if(gameState && gameState.getVar('state') === 'neutral') {

			gameState.setSocketStateVar(socket.id, 'state', 'ready');

			// If both are ready, start game
			if(gameState.gameIsReady()) {

				io.in(roomData.roomName).emit('Start Game');

				// Actually start the game phases & repeat if multiple rounds
				// Game phases server:
				// countdown -> emit to client that time is over. client will emit back choice
				// determine winner
				// repeat or end game
				if(gameState.hasRoundsLeft()) {
					io.in(roomData.roomName).emit('Round Start');

					gameState.setVar('state', 'timing');

					// setTimeout(function() {
					// 	console.log('Time Over');
					// 	gameState.setVar('state', 'timeOver');
					// 	io.in(roomData.roomName).emit('Time Over');
					// }, gameState.timeLimit);

					gameState.setVar('state', 'timeOver');
				}
				else {
					// Determine winner and End Game
				}

			}

		}
	});

	socket.on('choice', function(data) {
		console.log(data);
		const roomData = helpers.getSocketRoomData(socket);
		const gameState = roomData.room.gameState;

		if(gameState.getVar('state') === 'timeOver') {
			console.log('CHOICE!!!');
			gameState.setSocketStateVar(socket.id, 'choice', data.choice);

			if(gameState.bothSocketsHaveChoice()) {
				console.log('YEY');

				const results = gameState.scoreWinner();

				// reset choices
				gameState.setAllSocketStatesVar('choice', '');

				// increase round count if not tie
				if(results[_.keys(results)[0]].result !== 'tie') {
					gameState.increaseRound();
					var winner = gameState.hasMatchWinner();
					console.log('WINNER: ', winner);
				}

				console.log('ROUND: ', gameState.getVar('round'));

				// Send results

				// If winner exists (for entire match)
				const socketsInRoom = helpers.getSocketsInRoom(roomData.room);
				// TODO: Should check if someone has maxScore instead
				if(!winner) {
					gameState.setVar('state', 'neutral');
					helpers.sendResults('Round Over', socketsInRoom, results);
				}
				else {
					//end game
					gameState.setVar('state', 'gameOver');

					//
					helpers.sendResults('Game Results', socketsInRoom, results);

					// Make both sockets leave the room
					_.forEach(socketsInRoom, function(socketInRoom) {
						socketInRoom.leave(roomData.roomName);
					});

					// At this point the room doesn't exist anymore

				}
			}
		}
	});

	socket.on('error', function(error) {
		console.log('error: ', error);
	});
	socket.on('disconnecting', function(reason) {
		console.log('client disconnecting: ', reason);

		console.log('disconnecting client id: ', socket.id);
		const roomData = helpers.getSocketRoomData(socket);
		if(roomData && roomData.room) {
			const gameState = roomData.room.gameState;
			const socketsInRoom = helpers.getSocketsInRoom(roomData.room);
			_.forEach(socketsInRoom, function(socketInRoom) {
				if(socketInRoom.id !== socket.id) {
					console.log(socketInRoom.id);
					socketInRoom.emit('Opponent Forfeit');
					socketInRoom.leave(roomData.roomName);
				}
			});
		}

	});
	socket.on('disconnect', function(reason) {
		console.log('client disconnected: ', reason);
	});
});

