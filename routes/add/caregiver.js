const Caregiver = require('../../models/caregiver');
const bCrypt = require('bcrypt-nodejs');
const sendMail = require('../../functions/sendMail');

exports.post = function(req, res) {
  Caregiver.findOne({ 'email' : req.body.email }, function(err, user) {
    // In case of any error, return using the done method
    if (err){
       throw err;
    }
    // already exists
    if (user) {
      console.log('Caregiver already exists with email: ' + req.body.email);
      res.redirect('/personalArea/1');

    } else {
      var newCaregiver = new Caregiver();

      newCaregiver.email = req.body.email;
      newCaregiver.password = createHash(req.body.password);
      //Если добавляем из ЛК, то по св-ву авторизованного, а если с публичного профиля - по GET
      if(req.user.access_level == 2){
        newCaregiver.parent_ID = req.user._id;
      } else {
        newCaregiver.parent_ID = req.body._id;
      }

      newCaregiver.access_level = 3;

      // save the user
      newCaregiver.save(function(err) {
        if (err){
          console.log('Error in Saving coach: '+err);
          throw err;
        }
        // Отправим уведомление на почту
        //sendMail.sendEmailSuccesRegistration(req.headers.host, req.body.email);
        console.log('Coach Registration succesful');
      });
      res.redirect('/personalArea/1');
    }
  });
};

// Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
