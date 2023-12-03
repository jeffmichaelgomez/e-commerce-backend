const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Checkout = require("../models/Checkout");

module.exports.orderProduct = async (userData, product) => {
	if (!userData.isAdmin) {
		const { 
			id: userId, 
			name: userName 
		} = await User.findOne({_id: userData.id,}).then((result) => {
			return result;
		});

		const {
			id: productId,
			price: productPrice,
			name: productName,
			image: productImage,
		} = await Product.findOne({ _id: product.id }).then((result) => {
			return result;
		});

		let customerId = await Order.findOne({ customerId: userData.id }).then((result) => {
				return result.customerId;
			}
		);

		return await Order.findOne({ customerId: userId }).then((result) => {
			if (result == null) {
				const newOrder = new Order({
					customerId: userId,
					customerName: userName,
					orderedProducts: {
						productId: productId,
						productName: productName,
						productPrice: productPrice,
						image: productImage,
						quantity: 1,
					},
					totalAmount: productPrice,
				});
				return newOrder.save().then((user, error) => {
					if (error) {
						return false;
					} else {
						return true;
					}
				});
			} else {
				return Order.findOne({ customerId: userId }).then((order) => {
					order.orderedProducts.push({
						productId: productId,
						productName: productName,
						image: productImage,
						productPrice: productPrice,
						quantity: 1,
					});
					order.totalAmount = order.orderedProducts.reduce(
						(a, b) => a + b.productPrice,
						0
					);
					order.save();
					return true;
				});
			}
		});
	} else {
		return false;
	}
};

module.exports.increaseQuantity = async (userData, product) => {
	return Order.findOne({ customerId: userData.id }).then((order) => {
		for (i = 0; i < order.orderedProducts.length; i++) {
			if (order.orderedProducts[i]._id == product.id) {
				order.orderedProducts[i].quantity++;
				order.orderedProducts[i].productPrice =
					order.orderedProducts[i].productPrice *
					order.orderedProducts[i].quantity;
				order.totalAmount = order.orderedProducts.reduce(
					(a, b) => a + b.productPrice,
					0
				);
				order.save();
				break;
			}
		}
		order.save();
	});
};

module.exports.decreaseQuantity = async (userData, product) => {
	return Order.findOne({ customerId: userData.id }).then((order) => {
		for (i = 0; i < order.orderedProducts.length; i++) {
			if (order.orderedProducts[i]._id == product.id) {
				if (order.orderedProducts[i].quantity > 1) {
					order.orderedProducts[i].quantity--;
					order.orderedProducts[i].productPrice =
						order.orderedProducts[i].productPrice *
						order.orderedProducts[i].quantity;
					order.totalAmount = order.orderedProducts.reduce(
						(a, b) => a + b.productPrice,
						0
					);
					order.save();
					break;
				} else {
					break;
				}
			}
		}
		order.save();
	});
};

module.exports.removeOneProduct = async (userData, product) => {
	return Order.findOne({ customerId: userData.id }).then((order) => {
		for (i = 0; i < order.orderedProducts.length; i++) {
			if (order.orderedProducts[i]._id == product.id) {
				if (order.orderedProducts[i].quantity == 1) {
					order.orderedProducts.splice(i, 1);
					order.totalAmount = order.orderedProducts.reduce(
						(a, b) => a + b.productPrice,
						0
					);
					break;
				} else {
					return false;
					break;
				}
			}
		}
		order.save();
	});
};

module.exports.getAllOrders = async (userData) => {
	if (userData.isAdmin) {
		return Order.find({}).then((result) => {
			return result;
		});
	} else {
		return false;
	}
};

module.exports.getMyOrders = async (userData) => {
	if (userData.isAdmin == false) {
		return Order.findOne({ customerId: userData.id }).then((result) => {
			if (result == null) {
				return false;
			} else {
				return result;
			}
		});
	} else {
		return false;
	}
};

module.exports.checkOut = async (userData) => {
	return Order.findOne({ customerId: userData.id }).then((result) => {
		const newCheckout = new Checkout({
			name: result.name,
			totalAmount: result.totalAmount,
			customerId: result.customerId,
			customerName: result.customerName,
			orderedProducts: result.orderedProducts,
		});
		result.orderedProducts = [];
		return newCheckout.save().then((user, error) => {
			if (error) {
				return false;
			} else {
				return removeOrder();
			}
		});
	});
};
