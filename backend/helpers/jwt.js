const jwt = require('jsonwebtoken');
const secretKey = "admin";

const tokenGenerator = (user) => {
    const {id, name,email,birthdate,gender,avatar,type} = user;
    const token = jwt.sign({
        id,name,email,birthdate,gender,avatar,type
    }, secretKey)
    return token;
}

const tokenVerify = (token) => {
    const decoded = jwt.verify(token, secretKey)
    return decoded;
}

module.exports= {
    tokenGenerator, tokenVerify
}