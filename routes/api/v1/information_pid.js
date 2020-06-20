const PID = require('../../../models/pid');

exports.post = function(req, res) {
  PID.findById(res.pidId, { password: 0 }, function (err, pid) {
     if (err) return res.status(500).send('Error on the server: ' + err);
     if (!pid) return res.status(404).send("PID not found.");

     res.status(200).send(pid);
   });
};
