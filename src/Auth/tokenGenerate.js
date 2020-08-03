const jwt = require('jsonwebtoken')

const generateAuthToken = async (id,name) => {
    const generatedToken = jwt.sign({
        payload: {
            id,
            name,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) //7days => 604800
        }
      }, process.env.JWT_KEY);

    return generatedToken
}

module.exports = generateAuthToken