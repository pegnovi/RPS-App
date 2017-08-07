var _ = require('lodash');
const uuidv4 = require('uuid/v4');

// Move this into socket and have ref to sockets in gameState?
class SocketState {
	constructor() {
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
		this.maxRounds = 1;
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
		if(_.size(this.socketStates) === 2 &&
			_.isEmpty(_.filter(this.socketStates, (socketState) => socketState.state !== 'ready'))
		) {
			return true;
		}
		return false;
	}
	hasRoundsLeft() {
		return this.round < this.maxRounds;
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
			p1Result: p1Result,
			p2Result: resultMapReverser[p1Result]
		};
	}
	scoreWinner() {
		const socketStates = this.getSocketStatesAsArray();
		var results = this.evalWinner(socketStates[0].states.choice, socketStates[1].states.choice);
		if(results.p1Result === 'win') {
			this.socketStates[socketStates[0].socketId].increaseScore();
		}
		else if(results.p2Result === 'win') {
			this.socketStates[socketStates[1].socketId].increaseScore();
		}

		console.log(this.socketStates);
		return {
			[socketStates[0].socketId]: results.p1Result,
			[socketStates[1].socketId]: results.p2Result,
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
		}
	}
};

