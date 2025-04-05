import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";
import jwt from "jsonwebtoken";
import {createError} from "../utils/create.error.util.js";


export const registerUser = async (req, res, next) => {
    const session = await  mongoose.startSession();
    session.startTransaction();
    
    try{
        const {username,email,password,profileImage} = req.body;
        
        // Validate request body
        if(!username && !email && !password){
            // const error = new Error("All fields are required");
            // error.statusCode = 400;
            // throw error;
            throw createError("All fields are required",400);
        }
        
        const existingEmail = await userModel.findOne({email});
        
        if(existingEmail){
            // const error = new Error(`User with email :${email}  already exists`);
            // error.statusCode = 409;
            // throw error;
            throw createError(`User with email :${email}`,409);
        }
        
        const existingUsername = await userModel.findOne({username});
        
        if(existingUsername){
            // const error = new Error(`User with username :${username}  already exists`);
            // error.statusCode = 409;
            // throw error;
            throw createError(`User with username :${username}  already exists`,409)
        }
        
        // if profile image is not provided, use default image
        const profileImageUrl = profileImage ? profileImage : "https://api.dicebear.com/9.x/bottts/svg?seed=Sarah";
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create user
        const newUsers = await userModel.create([{username,email,password:hashedPassword,profileImage:profileImageUrl}],{session});
        
        // return token
        const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        
        await session.commitTransaction();
        session.endSession();
        
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:{
                token,
                // user:newUsers[0],
                user: {
                  id: newUsers[0]._id,
                  username: newUsers[0].username,
                  email: newUsers[0].email, 
                    profileImage: newUsers[0].profileImage,
                  createdAt: newUsers[0].createdAt,
                  updatedAt: newUsers[0].updatedAt,
                },
              
            }
        });
    }
    catch (error) {
        await  session.abortTransaction();
        await session.endSession();
        next(error);
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        // Validate request body
        if(!email || !password){
            throw createError("All fields are required",400);
        }

        // Check if user exists
        const existingUser = await userModel.findOne({email});

        if(!existingUser){
            throw createError("Invalid credentials",401);
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordValid){
            throw createError("Invalid credentials",401);
        }

        // return token
        const token = jwt.sign({userId:existingUser._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:{
                token,
                // user:existingUser,
                user:{
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    profileImage: existingUser.profileImage,
                    createdAt: existingUser.createdAt,
                    updatedAt: existingUser.updatedAt,
                }
            }
        });
    }
    catch (error) {
        next(error);
    }
}


export const logoutUser = async (req, res, next) => {}