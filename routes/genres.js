const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { genreSchema, Genre, validateGenre } = require("../models/genre");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:all-dev");
const validateObjectId = require("../middleware/validateObjectId");
const validate = require("../middleware/validate");

//////////////////////////////////////
// GETS ALL GENRES
router.get("/", async (req, res) => {
	const genres = await Genre.find().sort("name");
	res.send(genres);
});
//////////////////////////////////////

//////////////////////////////////////
// POSTS NEW GENRE
router.post("/", [auth, validate(validateGenre)], async (req, res) => {
	const genre = new Genre({ name: req.body.name });
	await genre.save();
	res.send(genre);
});
//////////////////////////////////////

//////////////////////////////////////
// UPDATES A GENRE
router.put("/:id", [auth, validate(validateGenre)], async (req, res) => {
	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true }
	);

	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");

	res.send(genre);
});
//////////////////////////////////////

//////////////////////////////////////
// DELETES A GENRE
router.delete("/:id", [auth, admin], async (req, res) => {
	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");

	res.send(genre);
});
//////////////////////////////////////

//////////////////////////////////////
// GETS A GENRE
router.get("/:id", validateObjectId, async (req, res) => {
	const genre = await Genre.findById(req.params.id);

	if (!genre)
		return res.status(404).send("The genre with the given ID was not found.");

	res.send(genre);
});
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = router;
//////////////////////////////////////
