const express = require('express');
const { Category } = require('../models/category');
const { Movie, validate } = require('../models/movie');
const router = express.Router();

router.get("/", async(req,res) => {
    const movie = await Movie.find().sort('name');
    if(!movie) return res.status(404).send("Movie not found");
    return res.send(movie);
})

router.get("/:id", async(req,res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send("Movie not found");
    return res.send(movie);
});

router.post("/", async(req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if(!category) return res.status(404).send("Category not found");

    let movie = new Movie({
        name: req.body.name,
        category: {
            _id: category._id,
            name: category.name
        }
    });
    await movie.save();
    return res.send(movie);
});

router.put("/:id", async(req,res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    });
    if(!movie) return res.status(404).send("Movie not found");
    return res.send(movie);
});

router.delete("/:id", async(req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send("Movie not found");
    return res.send(movie);
});


module.exports = router;