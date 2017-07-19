const _ = require('lodash');

const Server = require('socket.io');

const app = require('./app');

const PORT = 9000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});



function getRooms(io) {
	return io.sockets.adapter.rooms;
}

function getRoomsList(io) {
	const rooms = getRooms(io);
	return _.map(rooms, function(room, roomName) {
		console.log(room);
		console.log(roomName);
		return room;
	});
}

function startGame(io, socket) {
	console.log('startGame: ', socket.id);

	// TODO: check if there are any rooms
	// TODO: check if there are any rooms with less than 2 ppl
	socket.join('some room', function() {
		console.log(getRoomsList(io));
	});

}

const io = new Server().attach(8090);
io.on('connection', function(socket) {
	console.log('client connected!');


	socket.on('start game', function() {
		startGame(io, socket);
	});


	socket.on('error', function(error) {
		console.log('error: ', error);
	});
	socket.on('disconnecting', function(reason) {
		console.log('client disconnecting: ', reason);
	});
	socket.on('disconnect', function(reason) {
		console.log('client disconnected: ', reason);
	});
});

