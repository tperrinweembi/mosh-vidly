const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

describe("auth middleware", () => {
	// prettier-ignore
	beforeEach(() => { server = require("../../index");	});
	// prettier-ignore
	afterEach(async () => {
		await server.close();
		await Genre.deleteMany({})
	});

	let token;
	const exec = () => {
		return request(server)
			.post("/api/genres")
			.set("x-auth-token", token)
			.send({ name: "genre1" });
	};
	beforeEach(() => {
		token = new User().generateAuthToken();
	});

	it("should return 401 if token is empty string", async () => {
		token = "";
		const res = await exec();
		expect(res.status).toBe(401);
	});

	it("should return 401 if token is invalid", async () => {
		token = "a";
		const res = await exec();
		expect(res.status).toBe(400);
	});

	it("should return 200 if token is valid", async () => {
		const res = await exec();
		expect(res.status).toBe(200);
	});
});