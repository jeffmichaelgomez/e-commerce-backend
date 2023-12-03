//Capstone 2 Order Model
const mongoose = require("mongoose");
const checkoutSchema = new mongoose.Schema({
	totalAmount: {
		type: Number,
	},
	purchasedOn: {
		type: Date,
		default: new Date(),
	},
	customerId: {
		type: String,
		required: [true, "Id is required"],
	},
	customerName: {
		type: String,
		required: [true, "Name is required"],
	},
	orderedProducts: [
		{
			productId: {
				type: String,
			},
			productName: {
				type: String,
			},
			productPrice: {
				type: Number,
			},
			quantity: {
				type: Number,
			},
			image: {
				type: String,
			},
		},
	],
});

module.exports = mongoose.model("Checkout", checkoutSchema);
