const data = require("./data");
const dbConnection = require("./data/mongoConnection.js");

async function main() {
	//connect to db and sanitize it
	const db = await dbConnection();
	await db.dropDatabase();

	//Done
	console.log("Done.");
	await db.close();
}

main();