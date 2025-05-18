
const express = require('express');
const app = express();
require('dotenv').config();
const dBconnect = require('./config/DB/ConnectDB');
const port = process.env.PORT || 3000;
const cors = require('cors');
const AuthRoutes = require("./Routes/Auth.route")
const AuthRoutes = require("./Routes/Messages.route")
const cookieParser = require("cookie-parser")

dBconnect(process.env.MONGO_URI);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/auth" , AuthRoutes)
app.use("/api/Messages" , MessagesRoutes)


const startServer = async () => {
    try {
        await app.listen(port);
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
