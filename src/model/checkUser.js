const User = require("./User")

const checkUser = async (email) => {
    try {
        const user = await User.findOne({email}).exec();
        return user ? true : false;
    } catch (error) {
        return {"error": "something went wrong"};
    }
}

module.exports = checkUser