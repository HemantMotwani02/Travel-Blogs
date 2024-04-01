const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const { connectMongoDB } = require('./Connection/connection');
const userRouter = require('./Routes/User');
const app = express();
const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log("Server Started at ", PORT));


app.use(express.json());
app.use(express.urlencoded());


// Template Engine
app.set('view engine', 'hbs');
app.set('views', 'Views');

// Database Connection
connectMongoDB();

app.use('/',userRouter);
