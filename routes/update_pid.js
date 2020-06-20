const PID = require('../models/pid');
// const cloudinary = require('cloudinary');
// const config = require('../config').cloudinary;
// cloudinary.config({
//   cloud_name: config.cloud_name,
//   api_key: config.api_key,
//   api_secret: config.api_secret
// });


exports.post = async function (req, res) {
  try {

    let pid;

    if (req.body.login != undefined) {
      pid = await PID.findOne({ 'login': req.body.login });
    }

    if (pid != undefined) {
      res.send('PID already exists with this login');
    } else {
      let updateObject = req.body;
      await PID.updateOne({ "_id": req.params._id }, { $set: updateObject });
      res.send("Data successfully updated");
    }

  } catch (err) {
    throw err;
  }
};
