const MoneyGame = require('../models/money_game');
const PID = require('../models/pid');
const Caregiver = require('../models/caregiver');

exports.post = async function (req, res) {
  try {
    let caregiverIDs = [];
    let caregivers = await Caregiver.find({ parent_ID: req.params._id }, '_id'); // найти всех тренеров, привязанных к данному админу 

    // сформируем из обьектов id - массив id
    caregivers.forEach(caregiver => {
      caregiverIDs.push(caregiver._id);
    });

    let pidIDs = [];
    let pids = await PID.find({ parent_ID: caregiverIDs }, '_id'); // найти всех PID, привязанных к данным тренерам

    // сформируем из обьектов id - массив id
    pids.forEach(pid => {
      pidIDs.push(pid._id);
    });

    // ПРОТЕСТИТЬ БЕЗ 4-Х await
    await MoneyGame.deleteMany({ pid_id: pidIDs }) // удалить все зависимые MoneyGame
    await PID.deleteMany({ parent_ID: caregiverIDs }); // удалим всех зависимых PID
    await Caregiver.deleteMany({ parent_ID: req.params._id }); // удалим всех зависимых тренеров
    await Caregiver.deleteOne({ _id: req.params._id }); // удалим админа

    res.redirect('/personalArea/1');
  } catch (err) {
    throw err;
  }

  // Удаление всех тренеров и студентов тренеров или же перепривязка
  res.redirect('/personalArea/1');
};
