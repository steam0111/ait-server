const MoneyGame = require("../../../../../models/money_game_second");

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

        "correctChoice": req.headers.host + moneyGame.settings.correctChoice,
        "incorrectСhoice": req.headers.host + moneyGame.settings.incorrectСhoice,
        "textChoice": moneyGame.settings.textChoice,
        "showTextChoice": moneyGame.settings.showTextChoice, 
        "backgroundColor": moneyGame.settings.backgroundColor
      }
    );
  } catch (err) {
    throw err;
  }
}
  