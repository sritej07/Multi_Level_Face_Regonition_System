import mongoose, { Schema } from "mongoose";

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        rollno:{
            type:String,
            required:true
        }
    }
)
export const User=mongoose.model('User',userSchema);