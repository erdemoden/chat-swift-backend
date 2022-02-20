const express = require('express');
const db = require('./db')();
const log = require('./log.js');
const app = express();
const path = require('path')
require("dotenv").config();
app.listen(process.env.PORT||1998);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",log);
