const http = require('http');
const express = require('express');
const users = [];

const expRoutes = require('./expressroutes');

const stateObj = {
    users
}

const routes = expRoutes(stateObj);



const app = express();

app.use(express.json());

app.use(routes);




app.use((req,res)=>{
    res.status(404).send({message:"not found"});
});

app.listen(3000,()=>{
    console.log('server started at port 3000')
});

