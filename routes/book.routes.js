import {Router} from "express";
import {
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    searchBook,
    updateBook
} from "../controllers/book.controller.js";
import {authorize} from "../middlewares/auth.middleware.js";


const bookRouter = Router();

//create,update,retrieve & delete books

bookRouter.post("/", authorize,createBook);

bookRouter.get('/', authorize,getAllBooks);

bookRouter.get('/:id', authorize,getBookById);

bookRouter.get("/search", authorize,searchBook);

bookRouter.patch("/:id",authorize, updateBook);

bookRouter.delete("/:id", authorize,deleteBook);







export default bookRouter;