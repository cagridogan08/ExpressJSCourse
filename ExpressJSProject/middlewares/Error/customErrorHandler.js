const CustomError = require("../../models/Error");

const errorHandler=(err,req,res,next)=>{

    let item = err;
    if(err.name==="SyntaxError"){
        item = new CustomError("Unexpected Syntax",400);
    }
    else if(err.name==="ValidationError"){
        item = new CustomError(err.message,400);
    }
    if(err.code===11000){
        ///Duplicate
        item = new CustomError("Duplicate Key Found",400)
    }
    res.status(400).json({
        success:false,
        message:item.message
    });
};



module.exports = {
    errorHandler
}