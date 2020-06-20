const Module = require('../../models/module');

exports.post = function (req, res) {
    let newModule = new Module();

    newModule.name = req.body.name;
    newModule.url = req.body.url;

    newModule.save(function (err) {
        if (err) {
            throw err;
        }
    });

    res.redirect('/modules/1');
};
