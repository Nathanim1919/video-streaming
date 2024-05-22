import express from 'express';
import cors from 'cors';
import http from 'http';
import db from './config/db.js';
import authRoter from './routes/auth.route.ts';
import eventRouter from './routes/event.route.ts';
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


// routes
app.use('/api/v1/auth', authRoter)
app.use('/api/v1/events', eventRouter)


// With this line
server.listen(3000, () => {
    console.log('Server is running on port 3000')
});
