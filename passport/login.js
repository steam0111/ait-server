const LocalStrategy = require('passport-local').Strategy;
const Caregiver = require('../models/caregiver');
const Developer = require('../models/developer');
const bCrypt = require('bcrypt-nodejs');


module.exports = function (passport) {

  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
    function (req, email, password, done) {

        let userType = req.body.user_type;

        if (userType === "caregiver")
        {
            Caregiver.findOne({ 'email': email },
                function (err, user) {
                    if (err)
                        return done(err);

                    if (!user) {
                        console.log('Caregiver Not Found with username ' + email);
                        return done(null, false, req.flash('message', 'Caregiver Not found.'));
                    }

                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }

                    return done(null, user);
                }
            );
        }

        if (userType === "developer")
        {
            Developer.findOne({ 'email': email },
                function (err, user) {
                    if (err)
                        return done(err);

                    if (!user) {
                        console.log('Developer Not Found with username ' + email);
                        return done(null, false, req.flash('message', 'Developer Not found.'));
                    }

                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }

                    return done(null, user);
                }
            );
        }

    })
  );


  const isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  }

};
