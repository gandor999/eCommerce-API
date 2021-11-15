const Product = require("../models/Product");


// Create a product
module.exports.createProduct = async (reqBody, isAdmin) => {

	if(isAdmin){
		let isNewProduct = await Product.findOne({name: reqBody.name})
	   .then(result => {
	   		if(!result){
	   			return true;
	   		}
	   		else{
	   			return false;
	   		}
	   });

	   if(isNewProduct){
	   		let newProduct = new Product({
	   			name: reqBody.name,
	   			description: reqBody.description,
	   			price: reqBody.price,
	   		});

	   		return newProduct.save()
	   		.then((promise, error) => {
	   			if(error){
	   				return false;
	   			}
	   			else{
	   				return `New product created`;
	   			}
	   		})
	   }

	   else{
	   		return `There is already a product named "${reqBody.name}"`
	   }



	}

	else{
		return `Admin authority only`;
	}


}



// Get all active products
module.exports.getAllActive = () => {

	return Product.find({isActive: true})
	.then(result => result);

}



// Get one product
module.exports.getOneProduct = (data) => {
	
	return Product.findOne({_id: data})
	.then(result => result);

}


// Update one product
module.exports.updateProduct = async (productId, reqBody, isAdmin) => {

	if(isAdmin){
		let update = {
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price
		}

		return Product.findByIdAndUpdate(productId, update)
		.then((promise, error) => {
			if(error){
				return false;
			}
			else{
				return `Product has been updated`;
			}
		})
	}

	else{
		return `Admin authority only`;
	}
}


// Archive one product
module.exports.archiveProduct = async (productId, isAdmin) => {

	if(isAdmin){
		let update = {
			isActive: false
		}

		return Product.findByIdAndUpdate(productId, update)
		.then((promise, error) => {
			if(error){
				return false;
			}
			else{
				return `Product has been archived`;
			}
		})
	}

	else{
		return `Admin authority only`;
	}
}


