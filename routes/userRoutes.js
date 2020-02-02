const mongoose = require('mongoose');
const User = mongoose.model('users');
const passport = require('passport');
const passwordHash = require('password-hash');

module.exports = app => {
    app.post('/api/users',  (req, res) => {
        const newUser = new User(req.body);
        const hashedPassword = passwordHash.generate(newUser.password);
        newUser.password = hashedPassword;

        newUser.save((err, user) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json(user);
        }); 
    });

    // deplacer dans authRoute
    app.post('/api/login', passport.authenticate('local', {
        session: true,
        successRedirect: '/api/login-success',
        failureRedirect: '/api/login-failure'
    }));

    app.get('/api/login-success', (req, res) => {

        res.status(200).json(req.user);
    });
    
    app.get('/api/login-failure', (req, res) => {
        res.status(401).json(false);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}




