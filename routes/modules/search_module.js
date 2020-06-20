const Module = require('../../models/module');

exports.post = async function (req, res) {
    try {
        let search = req.body.search_module;
        // поиск по вхождению подстроки
        let foundModules = await Module.find({"name": {'$regex': '.*' + search + '.*'}});

        res.json({ modules: foundModules })
    } catch (err) {
        throw err;
    }
};
