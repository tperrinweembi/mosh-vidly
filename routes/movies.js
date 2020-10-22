const auth = require("../middleware/auth");
const { Movie, validateMovie } = require("../models/movie");
const { Genre } = require("../models/genre");
const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:all-dev");
const validate = require("../middleware/validate");

//////////////////////////////////////
// GETS ALL MOVIES
router.get("/", async (req, res) => {
	const movies = await Movie.find().sort("title");
	res.send(movies);
});
//////////////////////////////////////

//////////////////////////////////////
// POSTS NEW MOVIE
router.post("/", [auth, validate(validateMovie)], async (req, res) => {
	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send("Invalid genre.");

	const movie = new Movie({
		title: req.body.title,
		genre: {
			_id: genre.id,
			name: genre.name,
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate,
	});
	await movie.save();

	res.send(movie);
});
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = router;
//////////////////////////////////////
