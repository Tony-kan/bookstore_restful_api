import mongoose from "mongoose";


const userSchema =new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        minlength:[3,"Username must be at least 3 characters long"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match:[/\S+@\S+\.\S+/,"Please enter a valid email address"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength:[6,"Password must be at least 6 characters long"],
    },
    profileImage:{
        type: String,
        default: "",
    }
},{timestamps:true});


const userModel = mongoose.model("User",userSchema);

export default userModel;