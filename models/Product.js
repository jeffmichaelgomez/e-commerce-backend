//Capstone 2 Product Model
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	description: {
		type: String,
		required: [true, "Description is required"],
	},
	price: {
		type: Number,
		required: [true, "Price is required"],
	},
	image: {
		type: String,
		required: [true, "Price is required"],
	},
	category: {
		type: String,
		required: [true, "Price is required"],
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	createdOn: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model("Product", productSchema);
