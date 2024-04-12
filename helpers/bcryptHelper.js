const bcrypt = require('bcrypt');

module.exports.hashPass = async (pass) =>{

    try {
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(pass,saltRounds);
        return hashedPass;
    } catch (error) {
        throw new Error('Password hashed error ->',error);
    }

}

module.exports.comparePass = async (plainPass,hashedPass) =>{

    try {
        const match = await bcrypt.compare(plainPass,hashedPass);
        return match;
    } catch (error) {
        throw new Error('Password compare error ->',error);
    }

}