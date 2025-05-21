import express from 'express';
import { registerUser, loginUser, checkAuth, updateUser } from '../Controllers/User.Controller.js';
import { validregister, validlogin } from '../Middleware/validregister.js';
import { proctedRoute } from '../Middleware/Auth.Middleware.js';
import upload from '../Middleware/multer.js';

const router = express.Router();

router.post('/register', validregister, registerUser);
router.post('/login', validlogin, loginUser);
router.get('/check-auth', proctedRoute, checkAuth);
router.put('/update-user', proctedRoute, upload.single('profilePic'), updateUser);

export default router;
