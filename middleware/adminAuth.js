const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized (missing or invalid header)' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized (missing token)' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (req.user.username !== process.env.ADMIN_USERNAME ) {
            return res.status(403).json({ error: 'Forbidden (admin access required)' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized (invalid token)' });
    }
}