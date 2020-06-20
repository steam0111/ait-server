const Caregiver = require('../models/caregiver');
const crypto = require('crypto');
const sendMail = require('../functions/sendMail');
const constants = require('../functions/constants');

exports.post = async function (req, res) {
    try {
        let caregiver = await Caregiver.findOne({ email: req.body.email });

        if (caregiver) {
            const token = await generateToken();
            await Caregiver.findOneAndUpdate({ _id: caregiver._id },
                { $set: { reset_password_token: token, reset_password_expires: Date.now() + 86400000 } },
                { upsert: true, new: true }
            );

            let mailData = {
                to: caregiver.email,
                from: '',
                subject: 'Password help has arrived!',
                html: `You requested for a password reset, kindly use this <a href="${constants.PROTOCOL}${req.headers['host']}/reset_password?token=${token}">link</a> to reset your password`
            };
            sendMail.sendEmailRestorePassword(mailData);

            return res.status(200).json('Password recovery information sent to email');
        } else {
            return res.status(404).json('Caregiver not found');
        }

    } catch (err) {
        throw err;
    }
};


async function generateToken() {
    const buffer = await new Promise((resolve, reject) => {
        crypto.randomBytes(20, function (ex, buffer) {
            if (ex) {
                reject("error generating token");
            }
            resolve(buffer);
        });
    });
    const token = crypto
        .createHash("sha1")
        .update(buffer)
        .digest("hex");

    return token;
}
