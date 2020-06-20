const Module = require('../../models/module');

exports.post = async function (req, res) {
    try {
        await Module.deleteOne({ _id: req.params._id});
        res.redirect('/modules/1');
    } catch (err) {
        throw err;
    }
};
