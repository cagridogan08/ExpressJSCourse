const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");
var UserSchema = new Schema({
    name:
    {
        type:String,
        required:[true,"Please provide a name"]
    },
        email:
        {type:String,required:[true,"Please provide a email"],
        unique:true,
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,"Not Valid E Mail Addres"]
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    password:{
        type:String,
        minlength : 6,
        required:[true,"Please provide a password"],
        select:false
    }
    ,
    createDate:{
        type:Date,
        default:Date.now
    },
    title:{
        type:String
    }
    ,
    about:{
        type:String
    },
    place:{
        type:String
    },
    profile_img:{
        type:String,
        default:"default.jpg"
    },
    isBlocked:{
        type:Boolean,
        default:false
    }

});

//UserSchema Methods

UserSchema.methods.generateJwtFromUser = function(){
    var payload = {
        id:this._id,
        name:this.name,
        email:this.email
    };
    var {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;
    var token = jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    });

    return token;
};
/// hash with bcrypt
UserSchema.pre("save",function(next){
    //checking is password has changed
    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err)next(err);
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err)next();
            this.password = hash;
            next();
        });
    });
    
});
module.exports = mongoose.model("User",UserSchema);
