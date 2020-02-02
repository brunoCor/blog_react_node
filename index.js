const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
// const connection = mongoose.connection;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const keys = require('./config/keys');

const app = express();

require('./models/Post');
require ('./models/Category');
require('./models/User');
require('./models/Blogpost');
require('./models/Image');
require('./services/passport'); // <- to execute the script (use google strategy ...)
app.use(cookieParser());
app.use(
cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days (milliseconds)
    keys: [keys.cookieKey]
})
);
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(bodyParser.json()); //parse req.body

require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/blogpostRoutes')(app);
require('./routes/categoryRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const PORT = process.env.PORT || 5000;
app.listen(PORT);