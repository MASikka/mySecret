require('dotenv').config();
const express = require('express');
const mainRouter = require('./routes/mainRoute');
const session = require('express-session');
const passport = require('passport');

require('./models/db');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(mainRouter);
const port = 5000;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}.`);
});