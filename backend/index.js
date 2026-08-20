require('dotenv').config();
const http = require('http');
const express = require('express');
const db = require('./db');
const users = [];
const ErrorHandler = require('./middleware/errorHandler');


const expRoutes = require('./expressroutes');

const stateObj = {
    users
}

const routes = expRoutes(stateObj);

function logger(req,res,next){
    console.log(new Date().toISOString());
    console.log(`${req.method} ${req.url}`);
    next();
}

const app = express();

app.use(logger);
app.use(express.json());

app.use(routes);

app.use(ErrorHandler);


app.use((req,res)=>{
    res.status(404).send({message:"not found"});
});

app.listen(3000,()=>{
    console.log('server started at port 3000')
});

