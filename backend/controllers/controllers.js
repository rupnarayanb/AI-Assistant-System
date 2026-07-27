const userservice = require('../services/userService');
const errorHandler = require('../middleware/errorHandler');
const express = require('express');

 const router = express.Router();

//const users = await userservice.getAllUsers();

const getAllUsers = async (req,res, next)=>{
    try{
        const allUser = await userservice.getAllUsers();
        res.json(allUser);
    }catch(error){
         console.error(error);
         next(error);
       // errorHandler(error, req, res, next);
    }
}

const createUser = async (req,res, next)=>{
    const userdata = req.body;

    try{
        const createUser = await userservice.createUser(userdata);
   
        return res.status(201).send({
            "message": "User created successfully",
            "user": createUser      
        })     
    }catch(error){
        next(error);
    }
}

    const registerUser = async (req,res, next)=>{
        console.log("req.body =", req.body);
        const userData = req.body;

        try{
            const createdUser = await userservice.registerUser(userData);
    
            return res.status(201).json({
                "message": "User registered successfully",
                "user": createdUser      
            })     
        }catch(error){
            next(error);
        }
    }

module.exports = {
    getAllUsers,
    createUser,
    registerUser
}





