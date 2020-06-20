const Admin = require('../../models/caregiver');
const bCrypt = require('bcrypt-nodejs');
const sendMail = require('../../functions/sendMail');

exports.post = function(req, res) {
  Admin.findOne({ 'email' : req.body.email }, function(err, admin) {
    if (err){
        throw err;
    }
 
    if (admin) {
      console.log('Admin already exists with email: ' + req.body.email);
      res.redirect('/personalArea/1');

    } else {
      var newAdmin = new Admin();

      newAdmin.email = req.body.email;
      newAdmin.password = createHash(req.body.password);
      newAdmin.access_level = 2;


      // save the user
      newAdmin.save(function(err) {
        if (err){
          console.log('Error in Saving admin: '+err);
          throw err;
        }
        // Отправим уведомление на почту
        //sendMail.sendEmailSuccesRegistration(req.headers.host, req.body.email);
        console.log('Admin Registration succesful');
      });
      res.redirect('/personalArea/1');
    }
  });
};

// Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
