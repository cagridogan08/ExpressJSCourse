const mongoose = require("mongoose");


const connectDatabase=async()=>{
    try {
         await mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true}).then(()=>{
            console.log("Connection Successful");
         });
    } catch (error) {
        handleError(error);
    }
};

const handleError= (e)=>{
    console.log(e);
};
module.exports = {
    connectDatabase
}