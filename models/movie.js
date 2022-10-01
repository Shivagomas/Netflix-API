const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);

const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

function movieValidation(movie) {
  const schema = Joi.object({
    name: Joi.string().required(),
    genreId: Joi.objectid().required(),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = movieValidation;
