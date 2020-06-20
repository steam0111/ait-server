const PID = require('../../models/pid');

exports.get = function (req, res) {

  // Получим данные о конкретном студенте
  PID.findById(req.params._id, function (err, data) {
    if (err) {
      throw err;
    }
    
    res.render('testSettings', {
      title: 'testSettings',
      id: data._id,
      login: data.login,
      name: data.name,
      age: data.age,
      gender: data.gender
    });
  });

};
