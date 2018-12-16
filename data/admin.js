const mongoCollections = require('./mongoCollections');
const uuidv1 = require("uuid/v1");
const getAdminCollection= mongoCollections.admin;

//TODO: Input parameter checking
//Possibly use helper function to stay DRY

module.exports = {
	async createAdminByParams(username, hashedPassword) {
		
		const adminCollection = await getAdminCollection();

		const adminId = uuidv1();
		let newAdmin = {
			"_id": adminId,
    		"username": username,
    		"hashedPassword": hashedPassword
		};

		const insertInfo = await adminCollection.insertOne(newAdmin);
		if (insertInfo.insertedCount === 0) throw "Could not add admin to db.";

		const addedAdmin = await this.getAdminById(adminId);
		return addedAdmin;
	},

	async createAdminByObject(admin_object) {
		const adminCollection = await getAdminCollection();

		const adminId = uuidv1();
		let newAdmin = admin_object;
		newAdmin["_id"] = adminId;

		const insertInfo = await adminCollection.insertOne(newAdmin);
		if (insertInfo.insertedCount === 0) throw "Could not add admin to db.";

		const addedAdmin = await this.getAdminById(adminId);
		return addedAdmin;
	},

	async getAllAdmin() {
		const adminCollection = await getAdminCollection();

		const admin = await adminCollection.find({}).toArray();

		return admin;
	},

	async getAdminById(id) {
		const adminCollection = await getAdminCollection();

		const admin = await adminCollection.findOne({_id:id});

		if (admin === null) throw `No admin with id=${id}`;

		return admin;
	},

	async getAdminByUsername(username) {
		const adminCollection = await getAdminCollection();

		const admin = await adminCollection.findOne({"username":username});

		if (admin === null) throw `No admin with username=${username}`;

		return admin;	
	},

	async replaceAdmin(id, inputData) {
		const adminCollection = await getAdminCollection();

		const query = { 
			_id: id 
		}

		await adminCollection.replaceOne(query, inputData);

		return await this.getAdminById(id);
	},

	async updateAdmin(id, inputData) {
		const adminCollection = await getAdminCollection();

	    const updatedAdminData = inputData;

	    let updateCommand = {
	      $set: updatedAdminData
	    };

	    const query = {
	      _id: id
	    };

	    await adminCollection.updateOne(query, updateCommand);

	    return await this.getAdminById(id);
	},

	async removeAdmin(id) {
		const adminCollection = await getAdminCollection();

		const deleteInfo = await adminCollection.removeOne({_id: id});
		if (deleteInfo.deletedCount === 0) {
			throw `Failed to delete admin with id ${id}`
		}
		else return true;
	}
}
