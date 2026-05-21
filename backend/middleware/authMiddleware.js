const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        // Get token from headers
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save user id in request
        req.userId = decoded.id;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;