
import { hashedPassword, comparePassword, createToken } from '../Utils/Index.js';
import User from './../Models/User.Model.js';
import cloudinary from './../lib/Cloudinary.js';

//Register New User
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, bio } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }
        const hash = await hashedPassword(password);
        const user = await User.create({
            fullName,
            email,
            password: hash,
            bio,
        });
        const token = await createToken(user);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            UserData: user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist',
            });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const token = await createToken(user);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            UserData: user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//check user auth
export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Authenticated',
            UserData: req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// update user profile Details
export const updateUser = async (req, res) => {
    try {
        const { fullName, bio, profilePic } = req.body;

        const UserId = req.user._id;

        let UpdateUser;

        if (!profilePic) {
            UpdateUser = await User.FindByIdAndUpdate(UserId, {  bio, fullName }, { new: true });
        } else {
            const Upload = cloudinary.uploader.upload(profilePic);

            UpdateUser = await User.FindByIdAndUpdate(
                UserId,
                { profilePic: Upload.secure_url, bio, fullName },
                { new: true }
            );
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            UserData: UpdateUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};