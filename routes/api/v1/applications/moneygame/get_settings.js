const MoneyGame = require("../../../../../models/money_game");

exports.post = async function (req, res) {
  try {

    let moneyGame = await MoneyGame.findOne({ pid_id: res.pidId }, { 'settings': 1, _id: 0 });

    res.status(200).send(
      {
        "backBtn": req.headers.host + moneyGame.settings.backBtn,
        "progressBar": moneyGame.settings.progressBar,
        "nextBtn": req.headers.host + moneyGame.settings.nextBtn,
        "againBtn": req.headers.host + moneyGame.settings.againBtn,
        "wallet": req.headers.host + moneyGame.settings.wallet,
        "basket": req.headers.host + moneyGame.settings.basket,
      }
    );
  } catch (err) {
    throw err;
  }
}
  