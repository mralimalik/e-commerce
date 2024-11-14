import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    categoryName:{
        required: true,
        type: String,
        unique:true,
        trim:true,
    },
},{timestamps:true});




export const Category = mongoose.model('Category', categorySchema );
