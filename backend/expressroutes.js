const express = require('express');
const db = require('./db');
const userService = require('./services/userService');
const userController = require('./controllers/controllers');
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

    router.put('/api/users/:id',async (req,res)=>{
        const userdata = req.body;
        const userId = Number(req.params.id);

        if(!userdata.name || !userdata.role){
            return res.status(400).send({
                message:"Name or Role is missing"
            })
        }

        const queryText = `UPDATE users SET name = $1, role = $2 WHERE id = $3 RETURNING *`;
        const queryValues = [userdata.name,userdata.role, userId];


        try{
            const updatedUser = await db.query(queryText, queryValues);
            return res.status(200).send({
            "message": "User updated successfully",
            "user": updatedUser.rows[0]
            })

            if(!updatedUser.rows[0]){
                return res.status(404).send({
                    "message":"User not found"
                })
            }
        }catch(error){
            return res.status(500).send({
                "message":"Internal server error"
            });
        }
       
    
    
        
    })

    router.delete('/api/users/:id',async (req,res)=>{
        const userId = Number(req.params.id);
    

        const queryText = `DELETE FROM users WHERE id = $1 RETURNING *`;
        const queryValues = [userId];

        try {
            const deletedUser = await db.query(queryText, queryValues);
            if (!deletedUser.rows[0]) {
                return res.status(404).send({
                    "message": "User not found"
                });
            }
            return res.status(200).send({
                "message": "User deleted successfully",
                "user": deletedUser.rows[0]
            });
        } catch (error) {
            return res.status(500).send({
                "message": "Internal server error"
            });
        }
    });

    router.get('/api/users/:id',async (req,res)=>{
        const userId = Number(req.params.id);
        const user = users.find((item) => item.id === userId);
    
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
    
        return res.send(user);
    })

    router.get('/', (req, response)=>{
        response.send('home')
    });

    //userController.getAllUsers();

    
        router.get('/api/users', (req,response)=>{
            userController.getAllUsers(req,response);
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
