const userController = require('../controllers/controllers');

const validateUser =  (req,res,next)=>{
const userdata = req.body;

    if(!userdata.name || !userdata.role){
        return res.status(400).send({
            message:"Name or Role is missing"
        })
    }else{
        next();
         //userController.createUser(req,res); 
    }
}

module.exports = {
    validateUser
}