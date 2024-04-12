const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "secretKey");
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: 'Session expired', status: -1 });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: 'Invalid token or signature', status: -1 });
        } else {
            return res.status(401).json({ message: 'Unauthorized access', status: -1 });
        }
    }
};
