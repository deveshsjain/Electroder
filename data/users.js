const mongoCollections = require('./mongoCollections');
const uuidv1 = require("uuid/v1");
const getUsersCollection= mongoCollections.users;

//TODO: Input parameter checking
//Possibly use helper function to stay DRY

module.exports = {
	async createUserByParams(username, hashedPassword, name, email, contact_number, address) {
		
		const usersCollection = await getUsersCollection();

		const userId = uuidv1();
		let newUser = {
			"_id": userId,
    		"username": username,
    		"hashedPassword": hashedPassword,
    		"account_details": {
   	     		"name": name,
            	"email": email,
     	  		"contact_number": contact_number,
  				"address": address
			}
		};

		const insertInfo = await usersCollection.insertOne(newUser);
		if (insertInfo.insertedCount === 0) throw "Could not add user to db.";

		const addedUser = await this.getUserById(userId);
		return addedUser;
	},

	async createUserByObject(user_object) {
		const usersCollection = await getUsersCollection();

		const userId = uuidv1();
		let newUser = user_object;
		newUser["_id"] = userId;

		const insertInfo = await usersCollection.insertOne(newUser);
		if (insertInfo.insertedCount === 0) throw "Could not add user to db.";

		const addedUser = await this.getUserById(userId);
		return addedUser;
	},

	async getAllUsers() {
		const usersCollection = await getUsersCollection();

		const users = await usersCollection.find({}).toArray();

		return users;
	},

	async getUserById(id) {
		const usersCollection = await getUsersCollection();

		const user = await usersCollection.findOne({_id:id});

		if (user === null) throw `No user with id=${id}`;

		return user;
	},

	async getUserByUsername(username) {
		const usersCollection = await getUsersCollection();

		const user = await usersCollection.findOne({"username":username});

		if (user === null) throw `No user with username=${username}`;

		return user;	
	},

	async replaceUser(id, inputData) {
		const usersCollection = await getUsersCollection();

		const query = { 
			_id: id 
		}

		await usersCollection.replaceOne(query, inputData);

		return await this.getUserById(id);
	},

	async updateUser(id, inputData) {
		const usersCollection = await getUsersCollection();

	    const updatedUserData = inputData;

	    let updateCommand = {
	      $set: updatedUserData
	    };

	    const query = {
	      _id: id
	    };

	    await usersCollection.updateOne(query, updateCommand);

	    return await this.getUserById(id);
	},

	async removeUser(id) {
		const usersCollection = await getUsersCollection();

		const deleteInfo = await usersCollection.removeOne({_id: id});
		if (deleteInfo.deletedCount === 0) {
			throw `Failed to delete user with id ${id}`
		}
		else return true;
	},

	async isValidUser(username, password) {
		let isValid = false;
		let users=await getAllUsers();
		users.forEach(function(element) {
		  if (username === element.username && password===element.hashedPassword) {
		
	
			isValid = true;
		  }
		});
		return isValid;
	  }
}
