const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogpostSchema = new mongoose.Schema({
	title: String,
	summary: String,
	_image: { type: Schema.Types.ObjectId, ref: 'images' },
	content: String,
	createdOn: { type: Date, default: Date.now },
	_category: { type: Schema.Types.ObjectId, ref: 'categories' },
});

mongoose.model('blogposts', blogpostSchema);