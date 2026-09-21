const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token required"
            });
        }

        const token = authHeader.split(" ")[1];

        const secret = process.env.JWT_SECRET?.trim();

        if (!secret) {
            return res.status(500).json({
                message: "JWT secret is missing"
            });
        }

        const decoded = jwt.verify(token, secret);

        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };

        next();

    } catch (error) {
        console.error("JWT ERROR:", error);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;
