import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import { logger } from "./utils/logger.util.js";
import { connectToDatabase } from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import bookRouter from "./routes/book.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware)

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);


app.get("/", (req, res) => {
  res.send("Welcome to bookstore API");
});


app.listen(PORT, async () => {
  // console.log(`Server is running on http://localhost:${PORT}`);
  logger.info(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

