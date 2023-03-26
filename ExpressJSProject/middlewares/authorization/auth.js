var customError = require("../../models/Error");
const {isTokenInclueded,getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers");
var jwt = require("jsonwebtoken");
const CustomError = require("../../models/Error");
const getAccessToRoute=(req,res,next)=>{
    const {JWT_SECRET_KEY} = process.env;
    ///token
    if(isTokenInclueded(req)){
        ///valid form
        var token = getAccessTokenFromHeader(req);
        console.log(token);
        jwt.verify(token,JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
                return next(new CustomError("Not Auth",401));
            }
            console.log(decoded);
            res.json({
                success:true,
                data:{
                    id:decoded.id,
                    name:decoded.name,
                    email:decoded.email
                }
            });
            next();
        });
    }
    else{
        ///401 -> unauthorized
        ///403 -> forbidden
        return next(new CustomError("Not Valid Auth",401));
    }


    next();
    //Custom Error
};


module.exports={getAccessToRoute};