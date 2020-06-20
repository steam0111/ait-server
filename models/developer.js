const mongoose = require('mongoose');

const developerSchema = mongoose.Schema({
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
    developer: {
        type: Boolean,
        required: true
    }
});

developerSchema.virtual('developerId').get(function(){
    return this._id;
});

let Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;
