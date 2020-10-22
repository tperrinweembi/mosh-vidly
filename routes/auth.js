const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:all-dev");

//////////////////////////////////////
// AUTHENTICATES CREDENTIALS
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid email or password.");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("Invalid email or password.");

	const token = user.generateAuthToken();
	res.send(token);
});
//////////////////////////////////////

//////////////////////////////////////
// CREDENTIALS VALIDATION
function validate(proposedCredentials) {
	const credentialsValidation = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required(),
	};

	return Joi.validate(proposedCredentials, credentialsValidation);
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = router;
//////////////////////////////////////
