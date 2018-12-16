const mongoCollections = require('./mongoCollections');
const uuidv1 = require("uuid/v1");
const getProductsCollection= mongoCollections.products;

//TODO: Input parameter checking
//Possibly use helper function to stay DRY

module.exports = {
	async createProductByParams(prod_name, prod_image1, prod_image2, prod_image3,
		prod_brand, prod_price, prod_screensize, prod_ram, prod_processor,
		prod_hard_disk_size, prod_rating, sold) {
		
		const productsCollection = await getProductsCollection();

		const productId = uuidv1();
		let newProduct = {
			"_id": productId,
			"prod_name": prod_name,
			"prod_image1": prod_image1,
			"prod_image2": prod_image2,
			"prod_image3": prod_image3,
			"prod_brand": prod_brand,
			"prod_price": prod_price,
			"prod_screensize": prod_screensize,
			"prod_ram": prod_ram,
			"prod_processor": prod_processor,
			"prod_hard_disk_size": prod_hard_disk_size,
			"prod_rating": prod_rating,
			"sold": sold
		};

		const insertInfo = await productsCollection.insertOne(newProduct);
		if (insertInfo.insertedCount === 0) throw "Could not add product to db.";

		const addedProduct = await this.getProduct(productId);
		return addedProduct;
	},

	async createProductByObject(prod_object) {
		const productsCollection = await getProductsCollection();

		const productId = uuidv1();
		let newProduct = prod_object;
		newProduct["_id"] = productId;

		const insertInfo = await productsCollection.insertOne(newProduct);
		if (insertInfo.insertedCount === 0) throw "Could not add product to db.";

		const addedProduct = await this.getProduct(productId);
		return addedProduct;
	},

	async getAllProducts() {
		const productsCollection = await getProductsCollection();

		const products = await productsCollection.find({}).toArray();

		return products;
	},

	async getProduct(id) {
		const productsCollection = await getProductsCollection();

		const product = await productsCollection.findOne({_id:id});

		if (product === null) throw `No product with id=${id}`;

		return product;
	},

	async replaceProduct(id, inputData) {
		const productsCollection = await getProductsCollection();

		const query = { 
			_id: id 
		}

		await productsCollection.replaceOne(query, inputData);

		return await this.getProduct(id);
	},

	async updateProduct(id, inputData) {
		const productsCollection = await getProductsCollection();

	    const updatedProductData = inputData;

	    let updateCommand = {
	      $set: updatedProductData
	    };

	    const query = {
	      _id: id
	    };

	    await productsCollection.updateOne(query, updateCommand);

	    return await this.getProduct(id);
	},

	async removeProduct(id) {
		const productsCollection = await getProductsCollection();

		const deleteInfo = await productsCollection.removeOne({_id: id});
		if (deleteInfo.deletedCount === 0) {
			throw `Failed to delete product with id ${id}`
		}
		else return true;
	}
}
