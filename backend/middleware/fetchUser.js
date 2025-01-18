const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ankitisagoodpr0gramme1r';

const fetchUser = (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({error : "please try entering a valid authentication token"})
    }
    try {
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({error : "please try entering a valid authentication token"})
    }
}
module.exports = fetchUser;