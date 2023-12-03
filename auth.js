const jwt = require('jsonwebtoken');
const secret = process.env.secret;

//token creation
module.exports.createAccessToken = (user) => {
	//this data will be receive from the registratiojn form
	//and then when the user log in, a token will be created  with user's info
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin,
		//all of these information will be saved in the "const data"
	};

	//generates a JSON web token using jwt.sign
	return jwt.sign(data, secret, {});
};

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if (typeof token !== 'undefined') {
		console.log(token);
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if (err) {
				return res.send('Please Input Valid Token');
			} else {
				next();
			}
		});
	} else {
		return res.send('Please Input Valid Token');
	}
};

module.exports.decode = (token) => {
	if (typeof token !== 'undefined') {
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if (err) {
				return null;
			} else {
				return jwt.decode(token, { complete: true }).payload;
			}
		});
	} else {
		return null;
	}
};
