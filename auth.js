const express = require('express');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();



// Middleware function to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization']; // Assuming token is sent in the Authorization header

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        // If everything is good, save to request for use in other routes
        req.userId = decoded.email; // Assuming email is stored in the token
        next();
    });
}

// Generating Token
function generateToken(req, res) {

    const data = {
        email: 'testing@gmail.com'
    }
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    console.log(token);
}
generateToken();

app.get('/', verifyToken, (req, res) => {
    console.log("Server");
    res.status(200).send("Token verified successfully.");
});

app.listen(9000, console.log("Server"));






