const path = require('path');
const jwt = require('jsonwebtoken');

// module.exports runs before any route handler
// it checks if the request has a valid Authorization header
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization; // reads Basic/Bearer/etc token from request header
    // console.log('Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) { // checks if the authorization header is present and starts with 'Bearer'
        return res.status(401).json({ error: 'Unauthorized (missing or invalid header)'});
    }


    const token = authHeader.split(' ')[1]; // split(' ') splits at the space,[1] gets the token
    // console.log('Token:', token);

    if (!token) { 
        return res.status(401).json({ error: 'Unauthorized (missing token)'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // .verify checks if the token is valid and returns the payload(user and pass)
        req.user = decodedToken; // attach the decoded user info to the request object
        next();
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// use bycrypt (hash pass)
// user repository
// env