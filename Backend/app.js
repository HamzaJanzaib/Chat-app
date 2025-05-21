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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(Cors(
    {
        origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));
app.use(cookieParser());

app.use('/api/auth', UserRoute);
app.use('/api/message', MessageRoute);

export default app
