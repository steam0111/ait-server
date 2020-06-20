const pictogram = require('../../../../functions/pictograms');

exports.get = function (req, res) {
    try {
       let pictograms = pictogram.getLoginPictograms(req, false);

        res.status(200).send({
            "pictograms": pictograms
        });
     } catch (err) {
        throw err;
    }
};
