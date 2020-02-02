const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	path: {type: String, required: true },
	filename : {type: String, required: true}
});

mongoose.model('images', imageSchema);