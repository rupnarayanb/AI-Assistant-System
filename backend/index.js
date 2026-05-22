const http = require('http');
const express = require('express');

//console.log(express);
// const server = http.createServer(function(req,response){
//     console.log(req.url);
//     if(req.url === '/'){
//         response.end("home");
//     }else if(req.url === '/time'){
//         const date = new Date();
//         response.end(date.toLocaleString())
//     }else{
//         response.end("not homes")
//     }
    
// });
const app = express();
app.get('/', (req, response)=>{
    response.send('home')
});

app.get('/about', (req, response)=>{
    response.send('about')
});

app.get('/time', (req, response)=>{
    const date = new Date();
    response.send(date.toLocaleString())
});

app.listen(3000,()=>{
    console.log('ccc')
    });

// server.listen(3000,()=>{
//     console.log('ccc')
// });





