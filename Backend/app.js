import express from 'express';
import Cors from 'cors';
import connectDB from './lib/ConnectDB.js';
import cookieParser from 'cookie-parser';
import UserRoute from './Routes/User.Route.js';
import MessageRoute from './Routes/Message.Route.js';
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
app.use(cookieParser());

app.use('/api/auth', UserRoute);
app.use('/api/message', MessageRoute);

export default app
