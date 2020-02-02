const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	wording: String
});

mongoose.model('categories', categorySchema);