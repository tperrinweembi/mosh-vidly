//////////////////////////////////////
// SETS UP VIEW ENGINE
function setViews(app) {
	app.set("view engine", "pug");
	app.set("views", "./views");
}
//////////////////////////////////////

//////////////////////////////////////
// EXPORTS MODULE
module.exports = setViews;
//////////////////////////////////////
