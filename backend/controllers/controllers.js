const userservice = require('../services/userService');
const express = require('express');

 const router = express.Router();

//const users = await userservice.getAllUsers();

getAllUsers = async (req,res)=>{
    try{
        const allUser = await userservice.getAllUsers();
        res.json(allUser);
    }catch(error){
         console.error(error);
        res.status(500).json({"message":"Database Error"});
    }
}

createUser = async (req,res)=>{
    const userdata = req.body;

    try{
        const createUser = await userservice.createUser(userdata);
   
        return res.status(201).send({
            "message": "User created successfully",
            "user": createUser      
        })     
    }catch(error){
        return res.status(500).send({
            "message":"Internal server error"
        })
    }
}       

module.exports = {
    getAllUsers,
    createUser
}





