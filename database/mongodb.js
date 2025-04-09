import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";
// import { logger } from "../utils/logger.util.js";

if (!DB_URI){
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.<development | production>.local"
  );
  // logger.error("Please define the MONGODB_URI environment variable inside .env.<development | production>.local");
}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    // logger.info(`Connected to database in ${NODE_ENV} mode`);
    console.log("Connected to database in ${NODE_ENV} mode");
  } catch (error) {
    console.log(error);
    // logger.error(`Error Connecting to database in ${NODE_ENV} mode. Error:`, error);
    process.exit(1);
  }
};
