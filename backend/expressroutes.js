const express = require('express');
const db = require('./db');
//const expRoutes = express.Router();
function createRouterFactory(state){

    const users = state.users;
    
    const router = express.Router();
   

    router.post('/api/createUser',async (req,res)=>{
        const userdata = req.body;
    
        if(!userdata.name || !userdata.role){
            return res.status(400).send({
                message:"Name or Role is missing"
            })
        }

        const queryText = `INSERT INTO users(name, role ) VALUES($1, $2) RETURNING *`;
        const queryValues = [userdata.name,userdata.role];
    
        //users.push(createdUser);
        try{
            const createUser = await db.query(queryText, queryValues);
       
            return res.status(201).send({
                "message": "User created successfully",
                "user": createUser.rows[0]
            })     
        }catch(error){
            return res.status(500).send({
                "message":"Internal server error"
            })
        }
        
    })

    router.put('/api/users/:id',(req,res)=>{
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

    router.delete('/api/users/:id',(req,res)=>{
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

    router.get('/api/users/:id',(req,res)=>{
        const userId = Number(req.params.id);
        console.log(users);
        const user = users.find((item) => item.id === userId);
    
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
    
        return res.send(user);
    })

    router.get('/', (req, response)=>{
        response.send('home')
    });

    
        router.get('/api/users',async (req,response)=>{
            try{
              const allUser = await db.query('SELECT * FROM users');
              response.json(allUser.rows);
            }catch(error){
                response.status(500).json({"message":"Database Error"});
            }
        });
    

    

    router.get('/about',(req,response)=>{
        response.send('about asdsad')
    });

    router.get('/api/user',(req,response)=>{
        response.send({'name':"rup", 'role':'rrlkj'})
    });

    router.get('/time',(req,response)=>{
        const date = new Date();
        response.send(date.toLocaleString());
    });

    router.get('/api/products',(req,res)=>{
        res.send([{'name':"produc1", 'owner':'Rup'}, {'name':"produc2", 'owner':'Rup2'}])
    })

    router.get('/api/profile',(req,res)=>{
        res.send([{'name':'Rup', 'skills':{'frontend':true, 'backend':true}}])
    });

    return router

}



module.exports = createRouterFactory;
