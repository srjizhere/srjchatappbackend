const jwt = require('jsonwebtoken');

const genrateToken = (id)=>{
    return jwt.sign({id},process.env.jwtsecret,{
        expiresIn:"30d",
    })
}
module.exports = genrateToken