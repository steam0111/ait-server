const Module = require('../../models/module');

exports.post = async function (req, res) {
    try {

        let foundModules = await Module.find({});

        res.json({modules: foundModules})
    } catch (err) {
        throw err;
    }
};
