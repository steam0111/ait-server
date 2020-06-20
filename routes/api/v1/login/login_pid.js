const PID = require('../../../../models/pid');
const jwt = require('jsonwebtoken');
const apiError = require('../../../../functions/apierror');
const constants = require('../../../../functions/constants');

exports.post = function (req, res) {

  let login = req.body.login;
  let password = req.body.password;
  let errors = [];

  PID.findOne({ 'login': login }, function (err, pid) {
    if (err) throw err;

    if (!pid) {
      errors.push(apiError.createError("2", apiError.createInvalidCode('login-and-password'), 'Введены неверные данные', 'Вы ввели неверный login или password'));
      return res.status(401).json({
        errors
      });
    }

    if (pid.password != password) {
      errors.push(apiError.createError("2", apiError.createInvalidCode('login-and-password'), 'Введены неверные данные', 'Вы ввели неверный login или password'));
      return res.status(401).json({
        errors
      });
    }

    let token = jwt.sign({ id: pid._id }, constants.SECRET_STRING, {
      expiresIn: constants.TIME_LIFE_TOKEN
    });
    

    PID.updateOne({
      "_id": pid._id
    }, {
        $set: {
          "token": token,
        }
      }, function (err, results) {
        if (err) throw err;

        res.status(200).json({
          "token": token
        });
      });
  });
};
