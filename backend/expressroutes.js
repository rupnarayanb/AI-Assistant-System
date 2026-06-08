const express = require('express');
//const expRoutes = express.Router();
function createRouterFactory(users){
    const router = express.Router();

    router.get('/api/users',(req,response)=>{
        response.send(users)
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
