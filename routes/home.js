const express = require("express");
const router = express.Router();
const debug = require("debug")("app:all-dev");

//////////////////////////////////////
// INDEX
router.get("/", (req, res) => {
	res.render("index", {
		title: "My Express App",
		message: "hello",
	});
});
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = router;
//////////////////////////////////////
