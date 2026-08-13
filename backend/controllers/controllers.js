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

const loginUser = async (req,res, next)=>{
    const userData = req.body;

    try{
        const loginResponse = await userservice.loginUser(userData);
       
            return res.status(200).json({
                "message": "Login successful",
                ...loginResponse
            })  
       
    }catch(error){
        next(error);
    }
}

const logoutUser = async (req,res, next)=>{
    const refreshToken = req.body.refreshToken;

    try{
        await userservice.deleteRefreshToken(refreshToken);
        return res.status(200).json({
            "message": "Logout successful"
        });
    }catch(error){
        next(error);
    }
}

const loginUser = async (req,res, next)=>{
    const userData = req.body;

    try{
        const loginResponse = await userservice.loginUser(userData);
       
            return res.status(200).json({
                "message": "Login successful",
                ...loginResponse
            })  
       
    }catch(error){
        next(error);
    }
}

const refreshToken = async (req,res, next)=>{
    const refreshToken = req.body.refreshToken;

    try{
        const newAccessToken = await userservice.refreshToken(refreshToken);
       
            return res.status(200).json({
                "message": "Access token refreshed successfully",
                "accessToken": newAccessToken
            })
       
    }catch(error){
        next(error);
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

    const getProfile = async (req,res, next)=>{
        const userId = req.user.id; // Assuming the user ID is stored in req.user after authentication

        try{
            const profile = await userservice.getProfile(userId);
    
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
    
            return res.status(200).json(profile);
        }catch(error){
            next(error);
        }
    }

module.exports = {
    getAllUsers,
    createUser,
    registerUser,
    loginUser,
    getProfile,
    refreshToken,
    logoutUser
}       





