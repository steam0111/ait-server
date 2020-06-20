const mongoose = require('mongoose');

const moneyGameSecoondSchema = mongoose.Schema({
    pid_id: {
        type: String,
        required: true
    },
    settings: {
        type: Object,
        required: true
    },
    currency: {
        type: String,
        default: "euro"
    },
}); 

moneyGameSecoondSchema.virtual('moneyGameSecondId').get(function(){
    return this._id;
});

let moneyGameSecond = mongoose.model('moneyGameSecond', moneyGameSecoondSchema);

module.exports = moneyGameSecond;

