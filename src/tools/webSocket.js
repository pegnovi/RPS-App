import io from 'socket.io-client';

export function connect(url) {
	//return io('http://localhost:8090');
	if(url) {
		return io(url);
	}
	return io();
}

export function disconnect(socket) {
	socket.disconnect();
}
