const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  name: String,
  email: String,
  subject: String,
  body: String,
  dateSent: Date, 
});

postSchema.index({'$**': 'text'}); //define index on all String fields
// schema.index({name: 'text', 'profile.something': 'text'});
mongoose.model('posts', postSchema);
