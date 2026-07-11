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

module.exports = {
    getAllUsers
}





