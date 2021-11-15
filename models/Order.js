// Testing
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

	totalPrice: {
		type: Number,
		required: [true, `Total price is required`]
	},

	totalAmount: {
		type: Number,
		required: [true, `Total amount is required`]
	},

	purchasedOn: {
		type: Date,
		default: new Date()
	},

	userId: {
		type: String,
		required: [true, `UserId is required`]
	},


	items: [
		{
			price: {
				type: Number,
				required: [true, `Price is required`]
			},

			amount: {
				type: Number,
				required: [true, `Amount is required`]
			},

			productName: {
				type: String,
				required: [true, `Product name required`]
			},

			productId: {
				type: String,
				required: [true, `ProducId required`]
			}
		}
	]

});


module.exports = mongoose.model("Order", orderSchema);