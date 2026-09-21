const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Account created successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const secret = process.env.JWT_SECRET?.trim();

        if (!secret) {
            return res.status(500).json({
                message: "JWT secret is missing"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                role: user.role
            },
            secret,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    signup,
    login
};
