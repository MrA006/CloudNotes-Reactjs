var jwt = require('jsonwebtoken');
const JWT_secret = 'practice';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access, token not found' });
    }

    try {
        const data = jwt.verify(token, JWT_secret);
        req.user = { id: data.user.id };  // Set the user ID
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
}

module.exports = fetchuser;
