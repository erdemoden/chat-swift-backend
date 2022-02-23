const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db')();
const log = require('./log.js');
const app = express();
const path = require('path')
app.use(bodyParser.json({ limit: '1150mb' }))
app.use(bodyParser.urlencoded({
  limit: '1150mb',
  extended: true,
}))
app.use(express.json({limit: '1150mb'}));
app.use(express.urlencoded({limit: '1150mb'}));
require("dotenv").config();
app.listen(process.env.PORT||1998);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",log);
