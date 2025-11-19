import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    imagePublicId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        maxlength:10000
    },
    isPublished:{
        type:Boolean,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true})




export  const Post=mongoose.model('Post',postSchema)