const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const http = require('http')
const socketio = require('socket.io')


const app = express();
const server  = http.createServer(app, {
    cors:{
        origin:"http://localhost:5173"
    }
});

const io = socketio(server, {
    cors:{
        origin:"http://localhost:5173"
    }
});

let streamerSocket = null;


io.on('connection', (socket) => {
    console.log('User has connected', socket.id)
    socket.on('offer', (data) => {
        console.log('user sents an offer')
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        console.log('user sents an answer')
        socket.broadcast.emit('answer', data)
    });

    socket.on('candidate', (data) => {
        console.log('user sents an candidate')
        socket.broadcast.emit('candidate', data)
    });

    socket.on('start-stream', () => {
        streamerSocket = socket;
        console.log('user sents an start-stream', streamerSocket.id)
        // socket.broadcast.emit('start-stream')
    });

    socket.on('leave-stream', () => {
        console.log('User sent a leave-stream');
        socket.broadcast.emit('user-left', socket.id);
    });

    socket.on('streamer-confirmed', () => {
        console.log('Streamer confirmed')
        socket.broadcast.emit('streamer-confirmed')
    })

    socket.on('join-stream', () => {
        console.log('User sent a join-stream to the streamer: ',`${streamerSocket.id}`);
        if (streamerSocket) {
            console.log('user sents an join-stream')
            streamerSocket.emit('viewer-wants-to-join')
        }
    });

    socket.on('viewer-joined-successfully', () => {
        console.log('Viewer joined successfully');
    });

    socket.on('disconnect', () => {
        console.log('User has left')
    });

});


// With this line
server.listen(3000, () => {
    console.log('Server is running on port 3000')
});
