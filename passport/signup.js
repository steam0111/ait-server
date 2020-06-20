const LocalStrategy = require('passport-local').Strategy;
const Caregiver = require('../models/caregiver');
const Developer = require('../models/developer');
const bCrypt = require('bcrypt-nodejs');
const sendMail = require('../functions/sendMail');

module.exports = function (passport) {

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
    function (req, email, password, done) {

      findOrCreateUser = function () {

        let userType = req.body.user_type;

        if (userType === "caregiver")
        {
          Caregiver.findOne({ 'email': email }, function (err, user) {
            if (err) {
              console.log('Error in SignUp: ' + err);
              return done(err);
            }

            if (user) {
              console.log('Caregiver already exists with email: ' + email);
              return done(null, false, req.flash('message', 'Caregiver already exists with this email'));
            } else {

              let newCaregiver = new Caregiver();

              newCaregiver.email = email;
              newCaregiver.password = createHash(password);

              let currentDate = new Date();
              newCaregiver.created = currentDate.toUTCString();

              newCaregiver.save(function (err) {
                if (err) {
                  console.log('Error in Saving caregiver: ' + err);
                  throw err;
                }
                console.log('Caregiver Registration succesful');

                // Отправим уведомление на почту - пока нет необходимости
                //sendMail.sendEmailSuccesRegistration(req.headers.host, email);

                return done(null, newCaregiver);
              });
            }
          });
        }

        if (userType === "developer")
        {
          Developer.findOne({ 'email': email }, function (err, user) {
            if (err) {
              console.log('Error in SignUp: ' + err);
              return done(err);
            }

            if (user) {
              console.log('Developer already exists with email: ' + email);
              return done(null, false, req.flash('message', 'Developer already exists with this email'));
            } else {

              let newDeveloper = new Developer();

              newDeveloper.email = email;
              newDeveloper.password = createHash(password);
              newDeveloper.developer =true; // передалть без этого костыльного поля

              let currentDate = new Date();
              newDeveloper.created = currentDate.toUTCString();

              newDeveloper.save(function (err) {
                if (err) {
                  console.log('Error in Saving developer: ' + err);
                  throw err;
                }
                console.log('Developer Registration succesful');

                // Отправим уведомление на почту - пока нет необходимости
                //sendMail.sendEmailSuccesRegistration(req.headers.host, email);

                return done(null, newDeveloper);
              });
            }
          });
        }

      };

      // Delay the execution of findOrCreateUser and execute the method
      // in the next tick of the event loop
      process.nextTick(findOrCreateUser);

    })
  );


  const createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }


}
