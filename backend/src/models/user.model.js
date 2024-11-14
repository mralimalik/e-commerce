import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String,
        trim:true

    },
    email:{
        required: true,
        type: String,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        required: [true, 'Password is required'],
        type:String,
        trim:true

    },
    token:{
        type:String,
    },
    
},{timestamps:true});


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}



export const User = mongoose.model('User', userSchema );
