const User = require("../models/User");
// npm install bcrypt
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.getUsers = async (userData, reqBody) => {
	if (userData.isAdmin) {
		return User.find({}).then((result) => {
			return result;
		});
	} else {
		return false;
	}
};
module.exports.checkEmailExists = (reqBody) => {
	return User.find({ email: reqBody.email }).then((result) => {
		if (result.length > 0) {
			return true;
		} else {
			return false;
		}
	});
};
module.exports.registerUser = (reqBody) => {
	const newUser = new User({
		name: reqBody.name,
		address: reqBody.address,
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10),
	});

	return newUser.save().then((user, error) => {
		if (error) {
			return false;
		} else {
			return true;
		}
	});
};

module.exports.loginUser = (reqBody) => {
	return User.findOne({ email: reqBody.email }).then((result) => {
		if (result == null) {
			return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(
				reqBody.password,
				result.password
			);

			if (isPasswordCorrect) {
				return { access: auth.createAccessToken(result) };
			} else {
				return false;
			}
		}
	});
};
module.exports.getProfile = async (userData) => {
	return User.findById(userData.id).then((result) => {
		result.password = "";
		return result;
	});
};

module.exports.setAdmin = async (userData, userId, reqBody) => {
	if (userData.isAdmin) {
		return await User.findById(userId).then((result, error) => {
			if (error) {
				return false;
			}
			if (reqBody.isAdmin == false) {
				result.isAdmin = false;
				return result.save().then((user, error) => {
					if (error) {
						return false;
					} else {
						return true;
					}
				});
			} else {
				result.isAdmin = true;
				return result.save().then((user, error) => {
					if (error) {
						return false;
					} else {
						return true;
					}
				});
			}
		});
	} else {
		return false;
	}
};
