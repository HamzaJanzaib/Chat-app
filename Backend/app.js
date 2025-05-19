import express from 'express';
import Cors from 'cors';
import connectDB from "./ConnectDB.js";

import dotenv from 'dotenv';
dotenv.config();


if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not defined in the environment variables");
    process.exit(1);
}

// Connect to MongoDB
connectDB(process.env.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "4mb", extended: true }));
app.use(Cors());

export default app
