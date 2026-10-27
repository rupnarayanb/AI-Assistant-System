const userservice = require('../services/userService');
const errorHandler = require('../middleware/errorHandler');
const upload = require('../middleware/fileUpload');
const express = require('express');

 const router = express.Router();


const processBackgroundJob = async (req, res, next) => {
    try {
        // Simulate a background job using setTimeout
        setTimeout(() => {
            console.log('Background job completed');
        }, 5000); // Simulating a 5-second background job

        return res.status(200).json({
            message: 'Background job started successfully'
        });
    } catch (error) {
        next(error);
    }
};


 const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        if (req.file.size > 1 * 1024 * 1024) { // 1MB limit
            return res.status(400).json({ message: 'File size exceeds the limit of 1MB' });
        }

        // You can access the uploaded file information using req.file
        const fileInfo = {
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,    
        };

        return res.status(200).json({
            message: 'File uploaded successfully',
            file: fileInfo
        });
    } catch (error) {
        next(error);
    }
};

const createUserWithProfile = async (req, res, next) => {
    try {
        const result = await userservice.createUserWithProfile(req.body);
        return res.status(201).json({
            message: 'User and profile created successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req,res, next)=>{
    try{
        const { sortBy, sortOrder } = req.query;
        const allUser = await userservice.getAllUsers(sortBy, sortOrder);
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

const refreshToken = async (req,res, next)=>{
    const refreshToken = req.body.refreshToken;

    try{
        const newAccessToken = await userservice.refreshAccessToken(refreshToken);
       
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

const healthCheck = async (req, res, next) => {
    try {
        // Perform any necessary health checks here (e.g., database connection, external services, etc.)
        // For simplicity, we'll just return a success response.
        return res.status(200).json({
            message: 'API is healthy -v2'
        });
    } catch (error) {
        next(error);
    }
};

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
    logoutUser,
    createUserWithProfile,
    uploadFile,
    processBackgroundJob,
    healthCheck
}       





