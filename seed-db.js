const data = require("./data");
const dbConnection = require("./data/mongoConnection.js");
const productData = data.productsData;
const userData = data.userData;
const adminData = data.adminData;

const test_product1 = {
 	"prod_name":"HP ENVY x360 Convertible",
 	"prod_image1": "/Users/gopi/Documents/CS 546/Final Project/Electroder/PROJECT TEMPLATE/public/img/HP ENVY x360 Convertible_Image1",
    "prod_image2": "/Users/gopi/Documents/CS 546/Final Project/Electroder/PROJECT TEMPLATE/public/img/HP ENVY x360 Convertible_Image2",
    "prod_image3": "/Users/gopi/Documents/CS 546/Final Project/Electroder/PROJECT TEMPLATE/public/img/HP ENVY x360 Convertible_Image3",
 	"prod_brand": "HP",
 	"prod_price": "$ 750.99",
 	"prod_screensize":"14.9 Inches",
 	"prod_ram":"16 GB",
 	"prod_processor": "Intel Core i7",
	"prod_hard_disk_size":"1 TB",
 	"prod_rating":"4.0 out of 5.0",
	"sold": false
};

const test_product2 = {
	"prod_name":"LENOVO THINKPAD Convertible",
	"prod_image1": "/public/img/HP ENVY x360 Convertible_Image1.png",
   "prod_image2": "/public/img/HP ENVY x360 Convertible_Image2.png",
   "prod_image3": "/public/img/HP ENVY x360 Convertible_Image3.png",
	"prod_brand": "HP",
	"prod_price": "$ 500.99",
	"prod_screensize":"12.9 Inches",
	"prod_ram":"8 GB",
	"prod_processor": "Intel Core i5",
   "prod_hard_disk_size":"3 TB",
	"prod_rating":"5.0 out of 5.0",
   "sold": false
};


const test_product3 = { 
	
	"prod_name" : "HP 2000", 
	"prod_image1" : null,
	 "prod_image2" : null, 
	 "prod_image3" : null, 
	 "prod_brand" : "HP", 
	 "prod_price" : "123", 
	 "prod_screensize" : "14", 
	 "prod_ram" : "2", 
	 "prod_processor" : "i7",
	  "prod_hard_disk_size" : "1",
		"prod_rating" : "4", 
		"sold" : "true" 
	};

const test_product4 = {
	
	"prod_name" : "Apple MAC",
	 "prod_image1" : "/public/img/apple_image1.jpg",
	  "prod_image2" : "/public/img/apple_image2.png",
	  "prod_image3" : "/public/img/apple_image3.png",
		"prod_brand" : "Apple", 
		"prod_price" : "1500",
		 "prod_screensize" : "20", 
		 "prod_ram" : "2", 
		 "prod_processor" : "i7",
		  "prod_hard_disk_size" : "1", 
		  "prod_rating" : "1", 
		  "sold" : "true" 
		};
		
const test_product5 = {

 "prod_name" : "Dell Inspiron", 
 "prod_image1" : null, 
 "prod_image2" : null, 
 "prod_image3" : null,
  "prod_brand" : "Dell",
	"prod_price" : "800", 
	"prod_screensize" : "15", 
	"prod_ram" : "2",
	 "prod_processor" : "i7",
	  "prod_hard_disk_size" : "1", 
	  "prod_rating" : "1",
		"sold" : "false" 
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
	createProductTest1 = await productData.createProductByObject(test_product1);
	console.log("create product 1: " + JSON.stringify(createProductTest1));

	createProductTest2 = await productData.createProductByObject(test_product2);
	console.log("create product 2: " + JSON.stringify(createProductTest2));

	createProductTest3 = await productData.createProductByObject(test_product3);
	console.log("create product 3: " + JSON.stringify(createProductTest3));

	createProductTest4 = await productData.createProductByObject(test_product4);
	console.log("create product 4: " + JSON.stringify(createProductTest4));

	createProductTest5 = await productData.createProductByObject(test_product5);
	console.log("create product 5: " + JSON.stringify(createProductTest5));
	//User DB Tests
	createUserTest = await userData.createUserByObject(test_user1);

	console.log("create user: " + JSON.stringify(createUserTest));

	//Admin DB Tests
	createAdminTest = await adminData.createAdminByObject(test_admin1);

	console.log("create admin: " + JSON.stringify(createAdminTest));

	//Done
	console.log("Done.");
	await db.close();
}

main();