import { Schema,model,connect } from "mongoose";
import { connectDatabase } from "../helpers/database/connectDatabase";

interface IUser{
    name:string;
    email:string;
    password:string;
}

const userSchema = new Schema<IUser>({
    name:
    {type:String,
        required:[true,"Please provide a valid Name"],
        unique:true,
        
    },
    email:{type:String,
        required:true,
        match:new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")},
    password : 
    {type:String,
        required:true,
        minlength:6
    }

});

const User = model<IUser>('User',userSchema);

run().catch(e=>console.log(e));


async function run() {
    await connectDatabase();

    const user = new User({
        name:"Cagri",email:"cagridogan08@gmail.com",password:"123456"
    });
    await user.save();

    console.log(user.name);
}