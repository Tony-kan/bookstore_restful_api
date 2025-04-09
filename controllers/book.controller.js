


// function to create abook in the db
// import {logger} from "../utils/logger.util.js";
import {createError} from "../utils/create.error.util.js";
import cloudinary from "../config/cloudinary.js";
import bookModel from "../models/book.model.js";

export const getAllBooks = async (req, res, next) => {
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page -1) * limit;
        
        const books  = await bookModel
            .find()
            .sort({createdAt:-1})
            .skip(skip)
            .limit(limit)
            .populate("user","username profileImage");
        
        const totalBooks = await bookModel.countDocuments();
        
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
            totalBooks,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
        });
    }
    catch(error){
        logger.error(error);
        next(error)
    }
}

export const getBookById = async (req, res,next) => {
    try{
        const book = await bookModel.findById(req.params.id);
        
        if(!book){
            throw createError("Book not found",404)
        }
        
        res.status(200).json({
            success: true,
            data: book
        })
    }catch(error){
        logger.error(error);
        next(error)
    }
}

export const searchBook = async (req, res, next) => {
    
}

export const createBook = async (req, res,next) => {
    try{
        const {title,caption,bookCover,rating} = req.body

        if(!title && !caption && !bookCover && !rating){
            throw createError("Please provide at least one field to search",400)
        }

        // upload the to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(bookCover);
        const bookCoverUrl = uploadResponse.secure_url;

        // Save to the database
        const newBook = await bookModel.create({
            title,
            caption,
            bookCover:bookCoverUrl,
            rating,
            user:req.user._id
        })

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook
        })

        // if(!){
        //
        // }
    }
    catch (error) {
        // logger.error(error);
        next(error);
    }
}

export const updateBook = async (req, res,next) => {
    try{
        const {title,caption,bookCover,rating} = req.body;

        if(!title && !caption && !bookCover && !rating){
            throw createError("Please provide at least one field to update",400)
        }

        const book = await bookModel.findById(req.params.id);

        if(!book){
            throw createError("Book not found",404)
        }

        // upload the to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(bookCover);
        const bookCoverUrl = uploadResponse.secure_url;

        // Save to the database
        const updatedBook = await bookModel.findByIdAndUpdate(req.params.id,{
            title,
            caption,
            bookCover:bookCoverUrl,
            rating,
            user:req.user._id
        },{new:true})

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        })

    }catch(error){
        // logger.error(error);
        next(error);
    }
}


export const deleteBook = async (req, res,next) => {
    try {
       const book = await bookModel.findById(req.params.id);
       
       if(!book) {
           throw createError("Book not found",404)
       }
       
       if(!book.user.toString() !== req.user._id.toString()){
           throw createError("You are not authorized to delete this book",401)
       }
       
       // delete image from cloudinary as well
       if(book.bookCover && book.bookCover.includes("cloudinary")){
           try{
               const publicId = book.bookCover.split("/").pop().split(".")[0];
               await cloudinary.uploader.destroy(publicId);
           }catch(error){
               // logger.error(error);
               next(error);
           }
       }
       
       await bookModel.deleteOne({ _id: book._id })

        res.status(200).json({
            success: true,
            message: `Book with id : ${book._id} deleted successfully`,
        });
    }
    catch(error){
        // logger.error(error);
        next(error);
    }
}