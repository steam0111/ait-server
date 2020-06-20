const PID = require('../../models/pid');
const Admin = require('../../models/caregiver');
const pictogram = require('../../functions/pictograms');

exports.get = async function (req, res) {

  //const perPage = 1; // сколько записей отображать
  //const page = req.params.page || 1;

  // Как-то же надо проверять кого смотрим - ИСПРАВИТЬ ПО НОРМУ
  let publicPage;
  let url = req.url;
  if (url.indexOf("admins") != -1) {
    publicPage = "admins";
  } else if (url.indexOf("coaches") != -1) {
    publicPage = "coaches";
  } else if (url.indexOf("students") != -1) {
    publicPage = "students";
  }


  let pictograms = pictogram.getLoginPictograms(req);

  if (req.user.access_level == 3) {
    // Получим данные о конкретном студенте
    let pid = await PID.findById(req.params._id)

    res.render('publicProfile', {
      user: req.user,
      student: pid,
      pictograms: pictograms,
      currentPidLoginAndPassword: pictogram.getPictogramsForPidLoginAndPassword(pid)
    });

  } else if (req.user.access_level == 2) {
    // Получим данные о конкретном тренере - его список студентов
    let pids = await PID.find({ parent_ID: req.params._id });
    // Получим данные о конкретном студенте
    let pid = await PID.findById(req.params._id);

    res.render('publicProfile', {
      user: req.user,
      lengthStudents: pids.length,
      publicPage: publicPage,
      _id: req.params._id,
      students: pids,
      student: pid,
      pictograms: pictograms,
      currentPidLoginAndPassword: pid ? pictogram.getPictogramsForPidLoginAndPassword(pid) : ''
    });


  } else if (req.user.access_level == 1) {
    // Получим данные о конкретном админе(НЕ ГЛАВНОМ) - его список тренеров
    let caregivers = await Admin.find({ parent_ID: req.params._id });
    // Получим данные о конкретном тренере - его список студентов
    let pids = await PID.find({ parent_ID: req.params._id });
    // Получим данные о конкретном студенте
    let pid = await PID.findById(req.params._id);

    res.render('publicProfile', {
      user: req.user,
      lengthCoaches: caregivers.length,
      lengthStudents: pids.length,
      publicPage: publicPage,
      _id: req.params._id,
      coaches: caregivers,
      students: pids,
      student: pid,
      pictograms: pictograms,
      currentPidLoginAndPassword: pid ? pictogram.getPictogramsForPidLoginAndPassword(pid) : ''
    });
  }
};