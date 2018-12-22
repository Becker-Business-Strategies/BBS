const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const async = require('async');
const nodemailer = require('nodemailer');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {promiseLibrary: require('bluebird') })
    .then(() => console.log(`Connected to database ${config.database}`))
    .catch((err) => console.log(`Database error: ${err}`));

const app = express();

const users = require('./routes/users');
const admins = require('./routes/admins');
const mailer = require('./routes/mailer');


// Port Number
// const port = 3000; //(local)
const port = process.env.PORT || 8080; //(Heroku)

// CORS Middleware
app.use(cors());


// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//DOTENV MIDDLEWARE
require('dotenv').config();

require('./config/passport')(passport);

//USE ROUTES
app.use('/users', users);
app.use('/admins', admins);
app.use('/mailer', mailer);



//View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Index Route
// app.get('/', (req, res) => {
//     res.send('Invalid Endpoint');
// });
app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname,
        'public/index.html'));

});
// Start Server
app.listen(port, () => {
    console.log('Server started on port: '+port);
});