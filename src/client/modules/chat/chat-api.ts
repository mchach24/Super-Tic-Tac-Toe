/*---------------------------------------
Socket / Client / Chat
---------------------------------------*/

import io from 'socket.io-client';

export default function chatClientController() {
    const socket = io('/chat');

    socket.emit('chat/message', 'message');
}
