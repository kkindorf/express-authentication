const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB setup
mongoose.connect('mongodb://localhost/authorization');
//app setup

app.use(morgan('combined'));
//type: */* tells bodyParser that it will parse any body request using json
app.use(bodyParser.json({type: '*/*'}));
//router(app) allows us to pass app into the file
router(app);
//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('serving listening on: ', port);

