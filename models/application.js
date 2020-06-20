 // удалится все
const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tests: { // будут привязываться к тренеру, создавшему тест
      type: Array,
      default: null
    },
    settings: { // будут привязываться к конкретному cтуденту
      type: Array,
      default: null
    },
});

applicationSchema.virtual('applicationId').get(function(){
    return this._id;
});

let Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

