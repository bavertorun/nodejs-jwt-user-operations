const Joi = require('joi');
const { Schema, model } = require('mongoose');


const UserSChema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})


const User = model("User",UserSChema);

const validateUser = (user) =>{
    const schema = Joi.object({
        username: Joi.string().min(3).max(10).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(user);
}

module.exports = {User, validateUser};


