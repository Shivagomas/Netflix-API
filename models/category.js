const mongoose = require('mongoose');
const Joi = require('joi');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Category',categorySchema);

function categoryValidation(category){
    const schema = Joi.object({
        name: Joi.string().required()
    });
    return schema.validate(category)
}

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validate = categoryValidation;