const Caregiver = require('../models/caregiver');
const sendMail = require('../functions/sendMail');
const bCrypt = require('bcrypt-nodejs');

exports.post = async function (req, res) {
    try {

        let caregiver = await Caregiver.findOne({
            reset_password_token: req.body.token, reset_password_expires: {
                $gt: Date.now()
            }
        });  

        if (caregiver) {
            if (req.body.newPassword === req.body.verifyPassword && req.body.newPassword.length > 0) {

                await Caregiver.findOneAndUpdate({ _id: caregiver._id },
                    { $set: { password: createHash(req.body.newPassword), reset_password_token: undefined, reset_password_expires: undefined } });

                let mailData = {
                    to: caregiver.email,
                    from: '',
                    subject: 'Password Reset Confirmation',
                    html: `Your password has been successful reset, you can now login with your new password.`

                };
                sendMail.sendEmailRestorePassword(mailData);

                return res.status(200).json('Password successfully changed');
            } else {
                return res.status(422).json('Passwords do not match or are empty');
            }
        } else {
            return res.status(400).json('Password reset token is invalid or has expired.');
        }

    } catch (err) {
        throw err;
    }
};

exports.get = function (req, res) {
    res.render('reset_password_email');
};

const createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}