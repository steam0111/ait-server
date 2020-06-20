const Caregiver = require('../models/caregiver');
const PID = require('../models/pid');

module.exports = function (req, res, next) {

    if (req.params._id != undefined) {
        var pidId = req.params._id;
    } else if (req.body._id != undefined) {
        var pidId = req.body._id;
    }

    let userId = req.user._id;

    PID.findOne({ _id: pidId }, function (err, pid) {
        if (err) {
            throw err;
        }

        // Пока лишь непосредственно сам создатель может обновить данные для пида
        if (pid.parent_ID == userId) {
            return next();
        }

        res.redirect('/personalArea/1');
    });

}
 