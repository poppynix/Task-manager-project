module.exports = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden (admin access required)' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized (invalid token)' });
    }
}