const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:all-dev");
const validate = require("../middleware/validate");

//////////////////////////////////////
// GETS ALL USERS
router.get("/", async (req, res) => {
	const users = await User.find().sort("name");
	res.send(users);
});
//////////////////////////////////////

//////////////////////////////////////
// GETS A USER IN A SECURE WAY
router.get("/me", auth, async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	res.send(user);
});
//////////////////////////////////////

//////////////////////////////////////
// POSTS NEW USER
router.post("/", validate(validateUser), async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("Email already registered.");

	// Classic new user creation:
	// user = new User({
	// 	name: req.body.name,
	// 	email: req.body.email,
	// 	password: req.body.password,
	// });

	// With lodash: we get only name and email from user
	user = new User(_.pick(req.body, ["name", "email", "password"]));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = user.generateAuthToken();

	// using lodash to get only name and email from user
	res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));

	// or without email:
	// res.send({ name: user.name, email: user.email });
});
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = router;
//////////////////////////////////////
