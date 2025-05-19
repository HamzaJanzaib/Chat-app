import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        Match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    fullName: {
        type: String,
        required: true,
        minlength: 3,
    },
    profilePic: {
        type: String,
        required: false,
        default: 'https://avatar.iran.liara.run/public/boy'
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    bio: {
        type: String,
        required: false,
        minlength: 10,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
