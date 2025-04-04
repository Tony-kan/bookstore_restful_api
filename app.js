import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
