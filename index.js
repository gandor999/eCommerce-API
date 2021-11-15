const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const productRoutes = require("./routes/product");


const app = express();

// Connect to mongoDB
mongoose.connect('Please use another MongoDB connection string', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// All users routes
app.use("/users", userRoutes);


// All products routes
app.use("/products", productRoutes);



// Listening to port
app.listen(process.env.PORT || 4000, () => {
	console.log(`\nAPI is now online on port ${process.env.PORT || 4000}`)
});
