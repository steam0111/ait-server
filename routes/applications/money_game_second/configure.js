const PID = require("../../../models/pid");
const MoneyGame = require("../../../models/money_game_second");
const countFiles = require('../../../functions/getCountFilesInDirectory');
const fs = require('fs');

exports.get = async function (req, res) {

  try {

    let moneyGame = await MoneyGame.findOne({ pid_id: req.params._id }, { 'settings': 1, 'currency': 1, _id: 0 });
    let pid = await PID.findOne({ _id: req.params._id });

    let availableCurrencies = `./public/system_images/currency/`;
    let availableCurrenciesDirs = [];
    let allCurrencies = {};

    // получим название всех папок с валютами 
    fs.readdirSync(availableCurrencies).forEach(dir => {
      availableCurrenciesDirs.push(dir);
    });

    // пройдемся по папкам валют
    availableCurrenciesDirs.forEach(currencyDir => {
      let currencyPath = `./public/system_images/currency/${currencyDir}`;
      allCurrencies[`${currencyDir}`] = {};

      // пройдемся по папкам монеты/банкноты
      fs.readdirSync(`${availableCurrencies}${currencyDir}`).forEach(typeCurrency => {
        allCurrencies[`${currencyDir}`][`${typeCurrency}`] = []

        // сформируем массивы для каждого типа, и отсортирвем по возрастанию
        fs.readdirSync(`${currencyPath}/${typeCurrency}`).forEach(currency => {
          allCurrencies[`${currencyDir}`][`${typeCurrency}`].push(`/system_images/currency/${currencyDir}/${typeCurrency}/${currency}`);
        });
      });

      // отсортируем для каждого типа по возрастанию
      for (typeCurrency in allCurrencies[`${currencyDir}`]) {
        allCurrencies[`${currencyDir}`][`${typeCurrency}`].sort(function (a, b) {
          let countA = a.split('.')[0];
          countA = countA.split(`${typeCurrency}/`)[1];
          let countB = b.split('.')[0];
          countB = countB.split(`${typeCurrency}/`)[1];

          return countA - countB;
        });
      }
    });

    res.render("./applications/moneygame_second/configure", {
      pid: pid,
      settings: JSON.stringify(moneyGame.settings),
      host: req.headers.host,
      currency: moneyGame.currency,
      allCurrencies: JSON.stringify(allCurrencies),
      countFiles: countFiles.getCountFilesInDirectoryApplication('money_game_second', [['nextBtn', 'backBtn']], ['nextBack'])
    });
  } catch (err) {
    throw err;
  }

}


exports.post = async function (req, res) {

  try {

    let objectSettings = {
      backBtn: req.body.backBtn,
      progressBar: req.body.progressBar,
      nextBtn: req.body.nextBtn,
      againBtn: req.body.againBtn,
      wallet: req.body.wallet,
      basket: req.body.basket,

      correctChoice: req.body.correctChoice,
      incorrectChoice: req.body.incorrectChoice,
      textChoice: req.body.textChoice,
      showTextChoice: req.body.showTextChoice,
      backgroundColor: req.body.backgroundColor,
    }
 
    let updateData = {
      settings: objectSettings
    }

    await MoneyGame.updateOne({ pid_id: req.params._id }, {
      $set: updateData,
      currency: req.body.currency ? req.body.currency : "euro"
    });

  } catch (err) {
    throw err;
  }

}
