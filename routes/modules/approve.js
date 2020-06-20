const Module = require('../../models/module');

exports.post = async function (req, res) {
    try {
        let updateObject = {
            approved: true
        };
        console.log(req.params._id);
        await Module.updateOne({ _id: req.params._id}, { $set: updateObject });
        res.redirect('/modules/1');
    } catch (err) {
        throw err;
    }
};
