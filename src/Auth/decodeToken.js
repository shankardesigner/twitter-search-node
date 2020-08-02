const jwt = require('jsonwebtoken');

const decodeJwtToken = async (token) => {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    let decodedObject = jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => decodedToken);

    return decodedObject;
}

module.exports = decodeJwtToken;