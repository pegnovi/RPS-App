const _ = require('lodash');

const Server = require('socket.io');

const app = require('./app');

const PORT = 9000;

const server = app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});


//const io = new Server().attach(8090);
const io = require('socket.io')(server);
io.on('connection', function(socket) {
	console.log('client connected!');

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

