const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to connect to mongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(cors());

//to check if we are connected to MongoDB
mongoose.connection.once('open', () =>
	console.log('Now connected to MongoDB Atlas')
);

app.use('/', userRoutes);
app.use('/products', productRoutes);
app.use('/', orderRoutes);

//environment variable port or port 4000
app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${process.env.PORT || 4000}`);
});
