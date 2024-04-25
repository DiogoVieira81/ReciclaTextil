// Middleware function for admin authentication
const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" });
            } else {
                if (decodedToken.role !== "Basic") {
                    return res.status(401).json({ message: "Not authorized" });
                } else {
                    next(); // Proceed to the next middleware or route handler
                }
            }
        });
    } else {
        return res.status(401).json({ message: "Not authorized, token not available" });
    }
};

module.exports = adminAuth;