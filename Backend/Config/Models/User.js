const mongoose = require("mongoose");

const ChatUserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullname: {
            type: String,
            required: true        },
        password: {
            type: String,
            required: true,
            minlength: 6  
        },
        profilePic: {  
            type: String,
            default: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        },
    },
    { timestamps: true } // optional: adds createdAt and updatedAt fields
);

module.exports = mongoose.model("ChatUser", ChatUserSchema);
