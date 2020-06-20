const PID = require('../models/pid');
const MoneyGame = require('../models/money_game');
const MoneyGameSecond = require('../models/money_game_second');

exports.post = async function (req, res) {
  try {

    await MoneyGame.deleteOne({ pid_id: req.params._id });
    await MoneyGameSecond.deleteOne({ pid_id: req.params._id });
    await PID.deleteOne({ _id: req.params._id });

    res.redirect('/personalArea/1');
  } catch (err) {
    throw err;
  }

};
