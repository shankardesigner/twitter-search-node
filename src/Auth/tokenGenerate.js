const jwt = require('jsonwebtoken')

const generateAuthToken = async (id) => {
    const generatedToken = jwt.sign({
        payload: {
            id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }
      }, process.env.JWT_KEY);

    return generatedToken
}

module.exports = generateAuthToken