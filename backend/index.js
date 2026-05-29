const http = require('http');
const express = require('express');
const users = [];
let nextId = 1;



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

app.use(express.json());

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
    res.send(users);
})

app.get('/api/users/:id',(req,res)=>{
    const userId = Number(req.params.id);
    console.log(users);
    const user = users.find((item) => item.id === userId);

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    return res.send(user);
})



app.get('/api/products',(req,res)=>{
    res.send([{'name':"produc1", 'owner':'Rup'}, {'name':"produc2", 'owner':'Rup2'}])
})

app.get('/api/profile',(req,res)=>{
    res.send([{'name':'Rup', 'skills':{'frontend':true, 'backend':true}}])
})

app.put('/api/users/:id',(req,res)=>{
    const userdata = req.body;
    const userId = Number(req.params.id);
  
    const user = users.find((item) => item.id === userId);
    const userIndex = users.findIndex((item) => item.id === userId);

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const updatedUser = {
        "id": userId,
        "name": userdata.name ? userdata.name : user.name,
        "role": userdata.role ? userdata.role : user.role                                  
    };

    users[userIndex] = updatedUser;
    console.log(users);

    return res.send({
        "message": "User updated successfully",
        "user": updatedUser
    })
})

app.delete('/api/users/:id',(req,res)=>{
    const userId = Number(req.params.id);
   
    const user = users.find((item) => item.id === userId);
    const userIndex = users.findIndex((item) => item.id === userId);

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const deleteUser = {
        "name": user.name,
        "role": user.role,
    };


    users.splice(userIndex,1);

    console.log(users);

    return res.send({
        "message": "User deleted successfully",
        "user": deleteUser
    })
})

app.post('/api/createUser',(req,res)=>{
    const userdata = req.body;

    if(!userdata.name || !userdata.role){
        return res.status(400).send({
            message:"Name or Role is missing"
        })
    }

    const createdUser = {
        "id": nextId,
        "name": userdata.name,
        "role": userdata.role
    };

    nextId += 1;

    users.push(createdUser);
   
    return res.send({
        "message": "User created successfully",
        "user": createdUser
    })
})

app.use((req,res)=>{
    res.status(404).send({message:"not found"});
});

app.listen(3000,()=>{
    console.log('server started at port 3000')
});

// server.listen(3000,()=>{
//     console.log('ccc')
// });



