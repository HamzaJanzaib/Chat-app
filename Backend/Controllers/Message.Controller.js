import cloudinary from '../lib/Cloudinary.js';
import Message from '../Models/MessageModel.js';
import User from '../Models/User.Model.js';
import { io , UserSocketMap } from '../index.js';

// Get All User Messages
export const getMessagesForSideBar = async (req, res) => {
    try {
        const userId = req.user._id;
        const FiltedUsers = await User.find({ _id: { $ne: userId }, }).select('-password');

        const UniqueMessages = {};
        const promises = FiltedUsers.map(async (user) => {
            const message = await Message.find({ senderId: userId, receiverId: user._id, seen: false });
            if (message.length > 0) {
                UniqueMessages[user._id] = message.length;
            }
        })

        await Promise.all(promises);

        res.status(200).json({
            success: true,
            users: FiltedUsers,
            unSeenMessages: UniqueMessages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All for Single User Messages
export const getMessages = async (req, res) => {
    try {
        const MyId = req.user._id;
        const { id: friendId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: MyId, receiverId: friendId },
                { senderId: friendId, receiverId: MyId },
            ],
        });

        await Message.updateMany(
            { senderId: friendId, receiverId: MyId },
            { seen: true }
        );


        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//Mark Message as Seen
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;

        await Message.findByIdAndUpdate(id, { seen: true });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//send message to slected user
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;

        
        let image_url;
        if (image) {
            const Upload = cloudinary.uploader.upload(image);
            image_url = Upload.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: image_url,
        });

        // Emit the new message to the receiver's socket
        const receiverSocketId = UserSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('new-message', newMessage);
        }

        res.status(200).json({
            success: true,
            newMessage,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
