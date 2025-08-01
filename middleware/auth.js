const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
    const authHeader = req.headers.authorization; 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized (missing or invalid header)'});
    }
    const token = authHeader.split(' ')[1];
    if (!token) { 
        return res.status(401).json({ error: 'Unauthorized (missing token)'});
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}