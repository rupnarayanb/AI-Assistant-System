const express = require('express');
const expRoutes = express.Router();

expRoutes.get('/about',(req,response)=>{
    response.send('about asdsad')
});

expRoutes.get('/api/user',(req,response)=>{
    response.send({'name':"rup", 'role':'rr'})
});

expRoutes.get('/time',(req,response)=>{
    const date = new Date();
    response.send(date.toLocaleString());
});
module.exports = expRoutes;
