const data = require("./data");
const dbConnection = require("./data/mongoConnection.js");
const productData = data.productsData;
const userData = data.userData;
const adminData = data.adminData;

const test_product1 = {
 	"prod_name":"HP ENVY x360 Convertible",
 	"prod_image1": "http://www.myhost.com/images/my/path/to/image1.jpg",
    "prod_image2": "http://www.myhost.com/images/my/path/to/image2.jpg",
    "prod_image3": null,
 	"prod_brand": "HP",
 	"prod_price": "$ 750.99",
 	"prod_screensize":"14.9 Inches",
 	"prod_ram":"16 GB",
 	"prod_processor": "Intel Core i7",
	"prod_hard_disk_size":"1 TB",
 	"prod_rating":"4.0 out of 5.0",
	"sold": false
};

const test_user1 = {
    "username":"jaindevesh10",
    "hashedPassword":"$2a$08$XdvNkfdNIL8Fq7l8xsuIUeSbNOFgK0",
    "account_details": {
		"name":"Devesh Jain",
        "email ":"deveshjain@noder.com",
 		"contact_number ":"+1123-123-0000",
  		"address":"1 Castle Point, Hoboken, New Jersey"
	}
};

const test_admin1 = {
	"username":"jaindevesh10",
    "hashedPassword":"$2a$08$XdvNkfdNIL8Fq7l8xsuIUeSbNOFgK0"
};

async function main() {
	//connect to db and sanitize it
	const db = await dbConnection();
	await db.dropDatabase();

	//Product DB Tests
	createProductTest = await productData.createProductByObject(test_product1);

	console.log("create product: " + JSON.stringify(createProductTest));

	getProductTest = await productData.getProduct(createProductTest["_id"]);

	console.log("get product: " + JSON.stringify(getProductTest));

	removeProductTest = await productData.removeProduct(getProductTest["_id"])

	console.log("delete product: " + removeProductTest);

	//User DB Tests
	createUserTest = await userData.createUserByObject(test_user1);

	console.log("create user: " + JSON.stringify(createUserTest));

	getUserTest = await userData.getUserById(createUserTest["_id"]);

	console.log("get user: " + JSON.stringify(getUserTest));

	getUserByUsernameTest = await userData.getUserByUsername(test_user1["username"]);

	console.log("get user by username: " + JSON.stringify(getUserByUsernameTest));

	removeUserTest = await userData.removeUser(getUserTest["_id"]);

	console.log("delete user: " + removeUserTest);

	//Admin DB Tests
	createAdminTest = await adminData.createAdminByObject(test_admin1);

	console.log("create admin: " + JSON.stringify(createAdminTest));

	getAdminTest = await adminData.getAdminById(createAdminTest["_id"]);

	console.log("get admin: " + JSON.stringify(getAdminTest));

	getAdminByUsernameTest = await adminData.getAdminByUsername(test_admin1["username"]);

	console.log("get admin by username: " + JSON.stringify(getAdminByUsernameTest));

	removeAdminTest = await adminData.removeAdmin(getAdminTest["_id"]);

	console.log("delete admin: " + removeAdminTest);

	//Done
	console.log("Done.");
	await db.close();
}

main();