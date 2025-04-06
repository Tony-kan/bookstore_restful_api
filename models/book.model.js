import mongoose from "mongoose";


const bookSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
    },
    caption:{
        type:String,
        required:[true,"Caption is required"],
    },
    bookCover:{
        type:String,
        required:[true,"Cover is required"],
    },
    rating:{
        type:Number,
        default:0,
        // required:[true,"Rating is required"],
        min:[0,"Rating must be at least 0"],
        max:[5,"Rating must be at most 5"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User is required"],
    }

},{timestamps:true});

const bookModel = mongoose.model("Book",bookSchema);

export default bookModel;