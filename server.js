require('dotenv').config();
const express = require('express');
const fs = require("fs");
const app = express();
const port = 5000;
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn.js')
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials.js');
const corsOptions = require('./config/corsOptions.js');
const verifyJWT = require('./middleware/verifyJWT.js');
const { logger } = require('./middleware/logEvents.js');
const errorHandler = require('./middleware/errorHandler.js');

//Connection to datbase
connectDB();

//Logger and cors config init
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

//Allowing images from assets to be accessed throught API
app.use('/assets', express.static('assets/')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/auth', require('./api/auth.js'))
app.use('/refresh', require('./api/refresh.js'))
app.use('/logout', require('./api/logout.js'))

app.use('/api/users/register', require('./api/register.js'));
app.use('/api/users/login', require('./api/login.js'));
app.use('/api/restaurants', require('./api/restaurants.js'))
app.use('/api/blogs', require('./api/blogsUnauthorized.js')) //Unauthorized Actions on Blogs

app.use(verifyJWT);  //Token verification

app.use('/api/orders', require('./api/orders.js'))
app.use('/api/blogs', require('./api/blogsAuthorized.js')) //Authorized Actions on Blogs
 

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to database')
    app.listen(port, () => {console.log("Server runs on port " + port)});
})

