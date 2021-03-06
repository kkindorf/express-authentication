const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const router = require('./router');
const mongoose = require('mongoose');


//DB setup
mongoose.connect('mongodb://localhost/pinterest');


//app setup
app.use(morgan('combined'));
app.use(cors());
//type: */* tells bodyParser that it will parse any body request using json

//setting up limits here otherwise express throws error saying the file being posted is too large
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(fileUpload());


//router(app) allows us to pass app into the file
router(app);


//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('serving listening on: ', port);

