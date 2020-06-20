const mongoose = require('mongoose');

const caregiverSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: String,
        default: Date.now
    },
    access_level: {
      type: Number,
      required: true,
      default: 3
    },
    parent_ID: {
      type: String,
      required: false
    },
    reset_password_token: {
        type: String,
        required: false
    },
    reset_password_expires: {
        type: Date,
        required: false
    }
});

caregiverSchema.virtual('caregiverId').get(function(){
    return this._id;
});

let Caregiver = mongoose.model('Caregiver', caregiverSchema);

module.exports = Caregiver;
