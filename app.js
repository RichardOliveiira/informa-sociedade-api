const express = require('express');
const cors = require('cors')
const passport = require('passport');
const config = require('./config/config');
const mongoose    = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(passport.initialize());

const passportMiddleware = require('./services/passport');
passport.use(passportMiddleware);

mongoose.connect(config.db);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});


const users = require('./routers/users');
const avisosRouter = require('./routers/avisos');
app.use('/users', users)
app.use('/avisos', avisosRouter);

module.exports= app