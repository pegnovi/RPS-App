import io from 'socket.io-client';

export function connect() {
	return io('http://localhost:8090');
}

export function disconnect(socket) {
	socket.disconnect();
}
