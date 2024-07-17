var jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const JWT_secret = 'practice';


const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');
    
    if(!token){
        res.status(401).json('unauthorize access, token not found');
    }

    try {
        const data = jwt.verify(token, JWT_secret);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).json('unauthorize access');
        
    }

}

module.exports = fetchuser;