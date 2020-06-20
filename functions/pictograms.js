const fs = require('fs');

function getLoginPictograms(req, jsonStringify = true) {
  let pictogramsPath = `./public/system_images/pictograms/login`;
  let pictograms = [];

  // пройдемся по всем пиктограммам и сформируем массив объектов
  fs.readdirSync(pictogramsPath).forEach(pictogram => {
    let pictogramValue = pictogram.split('.')[0];

    let pictogramObject = {
      value: `_${pictogramValue}`,
    };

    // т.к разные форматы для API и фронта
    if (jsonStringify) {
      pictogramObject.image = `/system_images/pictograms/login/${pictogram}`;
    } else {
      pictogramObject.image = `${req.headers.host}/system_images/pictograms/login/${pictogram}`;
    }

    pictograms.push(pictogramObject);
  });

  // отсортируем массив
  pictograms.sort(function (a, b) {
    let valueA = a['value'].replace(/_/g, "");
    let valueB = b['value'].replace(/_/g, "");

    return valueA - valueB;
  });

  if (jsonStringify) {
    return JSON.stringify(pictograms);
  } else {
    return pictograms;
  }

}

function getPictogramsForPidLoginAndPassword(pid) {
  let pictogramsPath = `./public/system_images/pictograms/login`;
  let currentLoginPictograms = [];
  let currentPasswordPictograms = [];

  // распарсим логин и пароль по каждой пиктограмме
  currentLoginPictograms = pid.login.split('_');
  currentLoginPictograms.shift(); // т.к первый символ всегда с "_"
  currentPasswordPictograms = pid.password.split('_');
  currentPasswordPictograms.shift();

  // сформируем массив картинок для логина и пароля
  let loginAndPasswordPictograms = {};
  loginAndPasswordPictograms['LOGIN'] = [];
  loginAndPasswordPictograms['PASSWORD'] = [];

  // занесем в массив, предварительно узнав расширение
  currentLoginPictograms.forEach(value => {
    fs.readdirSync(pictogramsPath).forEach(pictogram => {
      let pictogramValue = pictogram.split('.')[0];
      let pictogramExtension = pictogram.split('.')[1];

      if (value == pictogramValue) {
        loginAndPasswordPictograms['LOGIN'].push(`/system_images/pictograms/login/${pictogramValue}.${pictogramExtension}`);
      }
    });
  });

  currentPasswordPictograms.forEach(value => {
    fs.readdirSync(pictogramsPath).forEach(pictogram => {
      let pictogramValue = pictogram.split('.')[0];
      let pictogramExtension = pictogram.split('.')[1];

      if (value == pictogramValue) {
        loginAndPasswordPictograms['PASSWORD'].push(`/system_images/pictograms/login/${pictogramValue}.${pictogramExtension}`);
      }
    });
  });

  return JSON.stringify(loginAndPasswordPictograms);
}


module.exports.getLoginPictograms = getLoginPictograms;
module.exports.getPictogramsForPidLoginAndPassword = getPictogramsForPidLoginAndPassword;