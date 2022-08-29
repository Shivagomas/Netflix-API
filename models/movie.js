const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const { categorySchema } = require("./category")

const movieSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true,
    },
    category: {
         type: categorySchema,
         required: true
     }
    
   })

const Movie = mongoose.model("Movie",movieSchema);

function movieValidation(movie) {
    const schema = Joi.object({
        name: Joi.string().required(),
        categoryId: Joi.objectid().required()
    });
    return schema.validate(movie)
}

exports.Movie = Movie;
exports.validate = movieValidation;