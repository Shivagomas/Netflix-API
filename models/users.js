const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", userSchema);

function generateAuthToken() {
    const token = jwt.sign({ _id:this._id, isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}

function userValidation(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(5).max(21),
        isAdmin: Joi.boolean()
    })
    return schema.validate(user);
};

exports.User = User;
exports.userSchema = userSchema;
exports.validate = userValidation;
exports.generateAuthToken = generateAuthToken;