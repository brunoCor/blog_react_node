const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const passwordHash = require('password-hash');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { // from server to cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => { // from cookie to server
  User.findById(id).then(user => {
    done(null, user);
  });
});

// [@todo] a redevelopper avec await
passport.use(new Strategy({
	usernameField: 'username',
	passwordField: 'password'
}, (name, pwd, cb) => {
	User.findOne({ username: name }, (err, user) => {
		if (err) {
      console.error(`could not find ${name} in MongoDB`, err);
      return cb(null, false);
		}
		if(!passwordHash.verify(pwd, user.password)) {
			cb(null, false);
		} else {
			cb(null, user);
		}
	});
}));

// passport.use( // serialize user is called when a user is authenticated
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: '/auth/google/callback',
//       proxy: true
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ googleId: profile.id });

//       if (existingUser) {
//         return done(null, existingUser);
//       }

//       const user = await new User({ googleId: profile.id }).save();
//       done(null, user);
//     }
    
//   )
// );
