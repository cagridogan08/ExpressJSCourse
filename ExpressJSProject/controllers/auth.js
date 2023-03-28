const asyncErrorWrapper = require("express-async-error-wrapper");
const { restart } = require("nodemon");
const user = require("../models/User");
var {sendJwtToClient} =require("../helpers/authorization/tokenHelpers");
var {validateUserInput,comparePassword} = require("../helpers/authorization/inputHelpers");
const CustomError = require("../models/Error");
const User = require("../models/User");
const register = asyncErrorWrapper(async(req,res,next)=>{
    
    var userReq = req.body;
    // try {
        
    // } catch (error) {
    //    return next(error);
    // }
    ///console.log(userReq.body);
    const val=await user.create({
        name:userReq.name,
        email:userReq.email,
        password:userReq.password
    });
    sendJwtToClient(val,res);
    // const token = val.generateJwtFromUser();
    // console.log(token);
    // res.status(200).json({
    //     Success:true,
    //     data:val
    // });
    
    
});


const tokentest = (req,res,next)=>{

    res.json({
        success:true
    });
};

const GetUser= (user)=>{
    res.json({
        user
    });
}


const login = asyncErrorWrapper(async(req,res,next)=>{
    var {email,password} = req.body;
    if(!validateUserInput(email,password)){
        return next(new CustomError("Check Input Values",400));
    }
    var user = await User.findOne({email}).select("+password");
    if(comparePassword(password,user.password)){
        console.log("True");
        sendJwtToClient(user,res);
        next();
    }
    else{
        next(new CustomError("Not Match",400));
    }
    
});


const logout = asyncErrorWrapper(async(req,response,next)=>{
    var {JWT_COOKIE}= process.env;
    return response.status(200).cookie({
        httpOnly:true,
        expires : new Date(Date.now()),
        secure:true
    }).json({
        success:true,
        message:"LogOut Successful"
    });
});

const imageUpload = asyncErrorWrapper(async(req,res,next)=>{
    //Image Upload Success
    console.log(req.body);
    res.status(200).json({
        success:true,
        message:"Image Upload Successfull"
    })
});

module.exports = {
    register,tokentest,GetUser,login,logout,imageUpload
};