var _ = require('lodash');
const uuidv4 = require('uuid/v4');

// Move this into socket and have ref to sockets in gameState?
class SocketState {
	constructor() {
		// Possible choices
		// - rock
		// - paper
		// - scissors
		// - '' (client hasn't sent choice)
		// - none (client sent empty choice)
		this.choice = '';
		this.score = 0;
	}
	setVar(key, val) {
		this[key] = val;
	}
	getVar(key) {
		return this[key];
	}
	increaseScore() {
		this.score = this.score + 1;
	}
}

// State:
// neutral
// timing
// timeOver
// gameOver
class GameState {
	constructor() {
		this.state = 'neutral';
		this.round = 0;
		this.maxRounds = 5;
		this.maxScore = 3;
		this.timeLimit = 3000;
		this.socketStates = {}; // map of SocketStates
	}
	getVar(key) {
		return this[key];
	}
	setVar(key, val) {
		this[key] = val;
	}
	addSocketState(socketId) {
		this.socketStates[socketId] = new SocketState();
	}
	setSocketStateVar(socketId, key, val) {
		this.socketStates[socketId].setVar(key, val);
	}
	getSocketStateVar(socketId, key) {
		return this.socketStates[socketId].getVar(key);
	}
	setAllSocketStatesVar(key, val) {
		const self = this;
		_.forEach(_.keys(this.socketStates), function(socketId) {
			self.setSocketStateVar(socketId, key, val);
		});
	}
	bothSocketsHaveChoice() {
		const self = this;
		const choices = _.filter(_.keys(this.socketStates), function(socketId) {
			if(self.getSocketStateVar(socketId, 'choice')) {
				return true
			}
			else {
				return false;
			}
		});
		return _.size(choices) === 2;
	}
	getSocketChoices() {
		return _.map(this.socketStates, function(val, key) {
			return {
				socketId: key,
				choice: val.getVar('choice')
			};
		});
	}
	getSocketStatesAsArray() {
		return _.map(this.socketStates, function(val, key) {
			return {
				socketId: key,
				states: val
			};
		});
	}
	gameIsReady() {
		const playersAreInRoom = _.size(this.socketStates) === 2;
		const playersAreReady = _.isEmpty(
			_.filter(this.socketStates, (socketState) => socketState.state !== 'ready')
		);

		if(playersAreInRoom && playersAreReady) {
			return true;
		}
		return false;
	}
	hasRoundsLeft() {
		return this.round < this.maxRounds;
	}
	hasMatchWinner() {
		var self = this;
		var winner;
		_.forEach(this.socketStates, function(socketState, socketId) {
			if(socketState.score >= self.maxScore) {
				winner = socketId;
				return false;
			}
		});
		return winner;
	}
	evalWinner(p1Choice, p2Choice) {

		console.log(p1Choice, ' vs ', p2Choice);

		const evaluator = {
			rock: {
				rock: 'tie',
				paper: 'lose',
				scissors: 'win',
				none: 'win'
			},
			paper: {
				paper: 'tie',
				scissors: 'lose',
				rock: 'win',
				none: 'win'
			},
			scissors: {
				scissors: 'tie',
				rock: 'lose',
				paper: 'win',
				none: 'win'
			},
			none: {
				none: 'tie',
				rock: 'lose',
				paper: 'lose',
				scissors: 'lose',
			}
		};

		const resultMapReverser = {
			win: 'lose',
			lose: 'win',
			tie: 'tie'
		};

		const p1Result = evaluator[p1Choice][p2Choice];

		return {
			p1Result: {
				result: p1Result,
				choice: p1Choice
			},
			p2Result: {
				result: resultMapReverser[p1Result],
				choice: p2Choice
			}
		};
	}
	scoreWinner() {
		const socketStates = this.getSocketStatesAsArray();
		const results = this.evalWinner(socketStates[0].states.choice, socketStates[1].states.choice);
		if(results.p1Result.result === 'win') {
			this.socketStates[socketStates[0].socketId].increaseScore();
		}
		else if(results.p2Result.result === 'win') {
			this.socketStates[socketStates[1].socketId].increaseScore();
		}
		results.p1Result.score = this.socketStates[socketStates[0].socketId].getVar('score');
		results.p2Result.score = this.socketStates[socketStates[1].socketId].getVar('score');

		console.log(this.socketStates);
		return {
			[socketStates[0].socketId]: results.p1Result,
			[socketStates[1].socketId]: results.p2Result
		};
	}
	increaseRound() {
		this.round = this.round + 1;
	}
}

module.exports = function(io) {
	return {
		getRooms: function() {
			return io.sockets.adapter.rooms;
		},
		getRoom: function(targetRoom) {
			if(targetRoom) {
				return this.getRooms()[targetRoom];
			}
			return null;
		},

		getSockets: function() {
			return io.sockets.sockets;
		},
		getSocketIds: function() {
			return _.keys(this.getSockets());
		},
		getSocket: function(socketId) {
			return io.sockets.sockets[socketId];
		},

		getGameRooms: function() {
			const sockets = this.getSocketIds();
			const rooms = this.getRooms();

			const gameRooms = {};
			_.forEach(rooms, function(room, roomName) {
				if(!_.includes(sockets, roomName)) {
					gameRooms[roomName] = room;
				}
			});
			return gameRooms;
		},

		findVacantRoomWithId: function(roomId) {
			const rooms = this.getRooms();
			const targetRoom = rooms[roomId];
			if(targetRoom && targetRoom.length < 2) {
				return roomId;
			};
			return '';
		},

		findVacantRoom: function() {
			const sockets = this.getSocketIds();
			const rooms = this.getRooms();

			var chosenRoomName = '';
			_.forEach(rooms, function(room, roomName) {
				if(!_.includes(sockets, roomName) && room.length < 2) {
					chosenRoomName = roomName;
					return false; // breakout
				}
			});
			return chosenRoomName;
		},


		setupGameStateIfNone: function(room) {
			if(room) {
				if(!room.gameState) {
					room.gameState = new GameState();
				}
				return room.gameState;
			}
			else {
				return null;
			}
		},



		getSocketRoomData: function(socket) {
			var socketRooms = _.filter(socket.rooms, function(val, key) {
				return key !== socket.id;
			});
			return {
				roomName: _.head(socketRooms),
				room: this.getRoom(_.head(socketRooms))
			};
		},

		// Socket is by default inside a room with its own id
		socketIsInRoom: function(socket) {
			return _.size(socket.rooms) === 2;
		},

		getSocketsInRoom: function(room) {
			var sockets = this.getSockets();
			var socketIdsInRoom = _.keys(room.sockets);
			return _.filter(sockets, function(socket) {
				return _.includes(socketIdsInRoom, socket.id);
			});
		},

		sendResults: function(eventType, socketsInRoom, results) {
			console.log('SENDING RESULTS');

			console.log(results);

			if(_.size(socketsInRoom) === 2) {
				const socket1 = socketsInRoom[0];
				const socket2 = socketsInRoom[1];

				socket1.emit(eventType, {
					own: results[socket1.id],
					opponent: results[socket2.id]
				});

				socket2.emit(eventType, {
					own: results[socket2.id],
					opponent: results[socket1.id]
				});
			}
		}
	}
};

