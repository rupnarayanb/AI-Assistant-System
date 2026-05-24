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

app.get('/user',(req,res)=>{
    res.send({'name':"rup", 'role':'rr'})
})

app.get('/api/users',(req,res)=>{
    res.send([{'name':"rup", 'role':'r1'}, {'name':"rup2", 'role':'r2'}])
})

app.get('/api/products',(req,res)=>{
    res.send([{'name':"produc1", 'owner':'Rup'}, {'name':"produc2", 'owner':'Rup2'}])
})

app.get('/api/profile',(req,res)=>{
    res.send([{'name':'Rup', 'skills':{'frontend':true, 'backend':true}}])
})

app.use((req,res)=>{
    res.status(404).send('error');
});

app.listen(3000,()=>{
    console.log('server started at port 3000')
    });

// server.listen(3000,()=>{
//     console.log('ccc')
// });





