import io from "socket.io-client";
import * as sessionMgmt from './SessionHandler';

var chatSocket = null;
if (chatSocket === null)
        chatSocket = io('http://localhost:4000/');

export function joinChat() {
    chatSocket.emit('JOINING', sessionMgmt.getUserName())
}

export function registerForEvent(eventKey, callback) {

    chatSocket.on(eventKey, callback);
}

export function sendMessage(eventKey, data) {
    chatSocket.emit(eventKey, data)
}