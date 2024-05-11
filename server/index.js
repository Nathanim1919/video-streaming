import express from 'express';
import cors from 'cors';
import http from 'http';
import db from './config/db.js';
import authRoter from './routes/authRote.js'
import eventRouter from './routes/eventRoute.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from "express-session";
import './passport/index.js';
import cookieParser from 'cookie-parser';



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


// cookie parser
app.use(cookieParser());

// required for passport
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
); // session secret

// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// database connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("MongoDB database connection established successfully");
});


const server = http.createServer(app); // Remove the second argument


// const io = new socketio.Server(server);


let streamerSocket= null; // Define type for streamerSocket

// io.on('connection', (socket) => {
//     console.log('User has connected', socket.id)
//     socket.on('offer', (data) => {
//         console.log('user sents an offer')
//         socket.broadcast.emit('offer', data);
//     });

//     socket.on('answer', (data) => {
//         console.log('user sents an answer')
//         socket.broadcast.emit('answer', data)
//     });

//     socket.on('candidate', (data) => {
//         console.log('user sents an candidate')
//         socket.broadcast.emit('candidate', data)
//     });

//     socket.on('start-stream', () => {
//         streamerSocket = socket;
//         console.log('user sents an start-stream', streamerSocket.id)
//         // socket.broadcast.emit('start-stream')
//     });

//     socket.on('leave-stream', () => {
//         console.log('User sent a leave-stream');
//         socket.broadcast.emit('user-left', socket.id);
//     });

//     socket.on('streamer-confirmed', () => {
//         console.log('Streamer confirmed')
//         socket.broadcast.emit('streamer-confirmed')
//     })

//     socket.on('join-stream', () => {
//         if (streamerSocket) {
//             console.log('User sent a join-stream to the streamer: ',`${streamerSocket.id}`);
//             console.log('user sents an join-stream')
//             streamerSocket.emit('viewer-wants-to-join')
//         }
//     });

//     socket.on('viewer-joined-successfully', () => {
//         console.log('Viewer joined successfully');
//     });

//     socket.on('disconnect', () => {
//         console.log('User has left');
//     });

// });




// routes
app.use('/api/v1/auth', authRoter)
app.use('/api/v1/events', eventRouter)


// With this line
server.listen(3000, () => {
    console.log('Server is running on port 3000')
});
