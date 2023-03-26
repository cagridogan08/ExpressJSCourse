

const sendJwtToClient=(user,res)=>{

    ///Generate JWT
    var token = user.generateJwtFromUser();
    var {JWT_COOKIE,NODE_ENV} = process.env;
    return res.status(200).cookie("access_token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+parseInt(JWT_COOKIE)*1000*60),
        secure:NODE_ENV==="development"? false:true
    }).json({
        success:true,
        access_token:token,
        data:{
            name:user.name,
            email:user.email
        }
    });

    ///REsponse
};
const isTokenInclueded=(req)=>{
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");
};

var getAccessTokenFromHeader=(req)=>{
    /// auth string splitting Bearer: {token}
    return req.headers.authorization.split(" ")[1];
}
module.exports = {
    sendJwtToClient,isTokenInclueded,getAccessTokenFromHeader
};