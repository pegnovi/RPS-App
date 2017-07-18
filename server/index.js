const Server = require('socket.io');

const app = require('./app');

const PORT = 9000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});

const io = new Server().attach(8090);
io.on('connection', function(socket) {
	console.log('client connected!');
});