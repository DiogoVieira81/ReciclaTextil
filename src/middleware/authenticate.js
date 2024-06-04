const { Request, Response, NextFunction } = require('express');
const { verify } = require("jsonwebtoken");
const jwtSecret = '424fdce80b01e737a19c9d465aae7b552e1354e181007475a6029fc9307d78ab0ae09f';



const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    try {
        const parsedText = token.split(" ")[1];
        const decoded = verify(parsedText, jwtSecret);
        
        req.userId = decoded.sub;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticate
