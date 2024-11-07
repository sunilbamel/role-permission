const jwt = require('jsonwebtoken');
const response = require('../helper/response');

const GenerateToken = (user) => {
    const token = jwt.sign({ user, iat: Math.floor(Date.now() / 1000) - 300000 }, 'apiKey');
    return token;
}

const VerifyToken = async (req, res, next) => {
    const AuthHeader = req.headers['authorization'];

    if (!AuthHeader) {
        return res.status(401).json(response.failed('Unauthorized'))
    }

    const token = AuthHeader && AuthHeader.split(' ')[0];
    const decode = jwt.verify(token, 'apiKey');
    if (!decode) {
        return res.status(401).json(response.failed('Unauthorized'))
    } else {
        req.user = decode.user
    }
    return next();
}

module.exports = {
    GenerateToken,
    VerifyToken
}