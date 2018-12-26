// import http from 'http';
import * as socketIO from 'socket.io';

export default function chat(io: socketIO.Server): void {

    const namespace = io.of('/chat');

    namespace.on('connection', (socket: SocketIO.Socket) => {
        console.log('a user connected');

        socket.on('chat/message', (msg: string) => {
            console.log(`a user sent: ${msg}`);
        });

        namespace.emit('hi', 'everyone!');
    });
}
