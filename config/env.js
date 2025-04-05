import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV, JWT_SECRET, JWT_EXPIRATION, DB_URI,LOG_LEVEL } =
  process.env;
