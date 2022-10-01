const express = require("express");
const { Genre, validate } = require("../models/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort("name");
  if (!genre) return res.status(404).send("genre not found");
  return res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("genre not found");
  return res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.stauts(400).send(error.details[0].message);

  let genre = new Category({
    name: req.body.name,
  });
  await genre.save();
  return res.send(genre);
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });
  if (!genre) return res.status(404).send("genre not found");
  return res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("genre not found");
  return res.send(genre);
});

module.exports = router;
