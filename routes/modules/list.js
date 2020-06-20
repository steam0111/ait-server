const express = require('express');
const router = express.Router();
const Module = require('../../models/module');

router.get('/modules/:page', async function (req, res) {

    const perPage = 10; // сколько записей отображать
    const page = req.params.page || 1;

    let modules = await Module.find({}).skip((perPage * page) - perPage).limit(perPage).exec();
    let count = await Module.find({}).countDocuments().exec();

    res.render('modules/list', {
        modules: modules,
        current: page,
        pages: Math.ceil(count / perPage),
        user: req.user,
    });
});

module.exports = router;
