const User = require("../models/User");
const Product = require('../models/Product');
const Order = require('../models/Order');
const bcrypt = require("bcrypt");
const auth = require('../auth');



// Register User
module.exports.registerUser = async (reqBody) => {

	let data = '';

	let isNewUser = await User.findOne({$or: [{email: reqBody.email}, {contactNo: reqBody.contactNo}]})
	.then(result => {
		if(!result){
			return true;
		}
		else{
			data = result;
			return false;
		}
	})

	if(isNewUser){
		let newUser = new User({
			email : reqBody.email,
			password : bcrypt.hashSync(reqBody.password, 10),
			firstName : reqBody.firstName,
			lastName : reqBody.lastName,
			contactNo : reqBody.contactNo
		});

		return newUser.save()
		.then((promise, error) => {
			if(error){
				return `An error occured please check codebase`;
			}
			else{
				return `User is now registered`;
			}
		})
	}

	else{
			if(data.email == reqBody.email){
				return `There is already an existing account with the email "${reqBody.email}"`;
			}

			if(data.contactNo == reqBody.contactNo){
				return `There is already an existing account with the phone number "${reqBody.contactNo}"`;
			}
	}

	
}



// User login
module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email})
	.then(result => {
		if(result == null){
			return `No such user`;
		}
		else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			if(isPasswordCorrect){
				return {access: auth.createAccessToken(result)}
			}
			else{
				return `Incorrect password`;
			}
		}
	})
}




// Set admin
module.exports.setAdmin = async (data, isAdmin) => {

	if(isAdmin){
		let update = {
			isAdmin: true
		}

		return User.findByIdAndUpdate(data, update)
		.then((promise, error) => {
			if(error){
				return false;
			}
			else{
				return `User has been given admin permission`;
			}
		})
	}

	else{
		return `Admin authority only`;
	}
}
