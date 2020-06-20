const MoneyGame = require('../models/money_game');
const PID = require('../models/pid');
const Caregiver = require('../models/caregiver');


exports.post = async function (req, res) {

  try {
    let pidIDs = [];
    let pids = await PID.find({ parent_ID: req.params._id }, '_id'); // найти всех PID, привязанных к данному тренеру 

    // сформируем из обьектов id - массив id
    pids.forEach(pid => {
      pidIDs.push(pid._id);
    });

    await MoneyGame.deleteMany({ pid_id: pidIDs }) // удалить все зависимые MoneyGame
    await PID.deleteMany({ parent_ID: req.params._id }); // удалим PID, привязанных к тренеру
    await Caregiver.deleteOne({ _id: req.params._id }); // удалим тренера

    res.redirect('/personalArea/1');
  } catch (err) {
    throw err;
  }

};
