const mongoose = require('mongoose');

const pidSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    // profile_photo: {
    //   data: Buffer,
    //   contentType: String
    // },
    parent_ID: {
        type: String,
        required: true
    },
    token: {
        type: String,
      },
    money_game: {
        type: String
    },
});

pidSchema.virtual('pidId').get(function(){
    return this._id;
});

let PID = mongoose.model('PID', pidSchema);

module.exports = PID;
