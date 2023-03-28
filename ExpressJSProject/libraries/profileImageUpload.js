var multer = require("multer");
var path = require("path");
const CustomError = require("../models/Error");

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        var rootDir = path.dirname(require.main.dirname);

        cb(null,path.join(rootDir,"/public/uploads"));
    },
    fileName:function(req,file,callback){
        // File - MimeType -image/png
        var extension = file.mimetype.split("/")[1];
        req.savedProfileImage= "image_"+req.user.id+"."+extension;
        cb(null,req.savedProfileImage);
    }
});
const fileFilter = (req,file,callback)=>{
    let allowedMimeTypes = ["image/jpg","image/gif","image/jpeg","image/png"];

    if(allowedMimeTypes.includes(file.mimetype)){
        return callback(new CustomError("Non Valid Image Type",400));
    }
    return callback(null,true);
};


const uploadProfileImage=multer({storage,fileFilter});


module.exports = {uploadProfileImage};