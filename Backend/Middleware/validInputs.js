module.exports.ValidInputs = (req, res, next) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (fullname.length < 4) {
        return res.status(400).json({ susses: false, message: "First name  must be at least 4 characters" });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ susses: false, message: "Invalid email format" });
    }

    if (password.length <= 5) {
        return res.status(400).json({ susses: false, message: "Password must be at least 6 characters" });
    }
    next();
};
module.exports.ValidInputsLogin = (req, res, next) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ susses: false, message: "Invalid email format" });
    }

    if (password.length <= 5) {
        return res.status(400).json({ susses: false, message: "Password must be at least 6 characters" });
    }
    next();
};
