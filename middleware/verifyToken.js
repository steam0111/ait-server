const PID = require('../models/pid');
var jwt = require('jsonwebtoken');
const apiError = require('../functions/apierror');
const constants = require('../functions/constants');

function verifyToken(req, res, next) {
  
  let token = req.headers['x-access-token'];
  let errors = [];

  if (token == undefined) {
    errors.push(apiError.createError("1", apiError.createInvalidCode('token'), 'Не заполнены обязательные поля', 'Пустое значение токена'));
    return res.status(403).json({
      errors
    });
  }

  // найдем pid, у которого данный токен
  jwt.verify(token, constants.SECRET_STRING, function (err, decoded) {
    if (err) {
      errors.push(apiError.createError("2", apiError.createInvalidCode('token'), 'Ведены неверные данные', 'Введен неверный токен, или срок действия токена истек'));
      return res.status(403).json({
        errors
      });
    }

    let pidId = decoded.id;

    PID.findById(pidId, function (err, pid) {
      if (err) throw err;
      if (!pid) {
        errors.push(apiError.createError("2", apiError.createInvalidCode('token'), 'Ведены неверные данные', 'Пользователь с введенным токеном был удален'));
        return res.status(403).json({
          errors
        });
      }

      // т.к срок действия старых токенов мог еще не истечь
      if (pid.token == token) { // ??? тут склейка с именем приложения: (pid.имя приложения
        res.pidId = pidId; // ??? тут склейка с именем приложения:  res.PIDId_ИМЯ ПРИЛОЖЕНИЯ
        return next(); 
      } else {
        errors.push(apiError.createError("2", apiError.createInvalidCode('token'), 'Ведены неверные данные', 'Введен неверный токен, или срок действия токена истек'));
        return res.status(403).json({
          errors
        });
      }
    });
  });
}

module.exports = verifyToken;

 

