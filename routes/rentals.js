const auth = require("../middleware/auth");
const { Rental, validateRental } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const Joi = require("joi");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:all-dev");
const validate = require("../middleware/validate");

Fawn.init(mongoose);

//////////////////////////////////////
// GETS ALL RENTALS
router.get("/", async (req, res) => {
	const rentals = await Rental.find().sort("-dateOut");
	res.send(rentals);
});
//////////////////////////////////////

//////////////////////////////////////
// POSTS NEW RENTAL
router.post("/", [auth, validate(validateRental)], async (req, res) => {
	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send("Invalid customer.");

	const movie = await Movie.findById(req.body.movieId);
	if (!movie) return res.status(400).send("Invalid movie.");

	if (movie.numberInStock === 0)
		return res.status(400).send("Movie not available.");

	let rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailytRentalRate: movie.dailyRentalRate,
		},
	});

	try {
		new Fawn.Task()
			.save("rentals", rental)
			.update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
			.run();

		res.send(rental);
	} catch (err) {
		res.status(500).send("Something failed.");
	}
});
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = router;
//////////////////////////////////////
