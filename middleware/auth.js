const jwt = require('jsonwebtoken');

function authenticateAdmin(req,res,next){
    let token = req.headers['autorization'];
    if(!token){
        return res.status(401).json('Token does not exist')
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if (decode.role !== 'admin') {
            return res.status(400).json('Unauthorized');
        }
        req.user = decode;
        next();
    }catch(e){
        res.status(400).json('Token invalid')
    }
}
function authenticateTeacher(req,res,next){
    let token = req.headers['autorization'];
    if(!token){
        return res.status(401).json('Token does not exist')
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if (decode.role !== 'teacher') {
            return res.status(400).json('Unauthorized');
        }
        req.user = decode;
        next();
    }catch(e){
        res.status(400).json('Token invalid')
    }
}
module.exports = {authenticateAdmin, authenticateTeacher};
