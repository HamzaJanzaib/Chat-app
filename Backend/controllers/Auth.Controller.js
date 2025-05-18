const { UserModel } = require("../Config/Models/index");
const cloudinary = require("../Lib/Cloudinary.Config");
const { hashedPassword, comparePassword } = require("../Utils/Bcrypt");
const { createToken } = require("../Utils/Jwt");

module.exports.Register = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hash = await hashedPassword(password);

        const newUser = await UserModel.create({
            fullname,
            email,
            password: hash,
        });

        if (newUser) {
            await createToken(newUser, res);

            // Exclude password before sending the user data back
            const { password, ...userData } = newUser._doc;

            res.status(200).json({
                success: true,
                data: userData,
                message: "Registered successfully"
            });
        } else {
            res.status(400).json({ success: false, message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}
module.exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await createToken(user, res);

        // Exclude password before sending back the user data
        const { password: userPassword, ...userData } = user._doc;

        res.status(200).json({
            success: true,
            token,
            user: userData,
            message: "Logged in successfully"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
module.exports.Logout = async (_, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports.UpdateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const UserId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ success: false, message: "Profile picture is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await UserModel.findByIdAndUpdate(
            UserId,
            { ProfilePic: uploadResponse.secure_url },
            { new: true }
        ).select("-password"); // exclude password from response

        res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error("Profile picture upload error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}
module.exports.CheckAuth = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({
                success: true,
                message: "Data Fetch successfully",
                data: req.user
            });
        }
    } catch (error) {
        console.error("Profile picture upload error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}
