//main starting point of the application
const express = require('express');
const http= require ('http');
const bodyParser= require('body-parser');
const morgan = require('morgan');
const app= express();
const router=require('./router');
const mongoose= require('mongoose');
const cors = require('cors');

//db setup
mongoose.connect('mongodb://luismasg:luismasg@ds133388.mlab.com:33388/listsluisma');

//App setup
app.use(morgan('combined'));/*this logs everything*/
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));
router(app);

//server setup
const port =process.env.PORT||3090;
const server= http.createServer(app);
server.listen(port);
console.log('server listening on port',port);
