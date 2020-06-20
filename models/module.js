const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    created: {
        type: String,
        default: Date.now
    },
    developer_ID: {
        type: String,
        default: '',
        required: false
    },
    approved: { // одобряет админ(пока caregiver с уровнем доступа == 1)
        type: Boolean,
        default: false,
        required: true
    }
});

moduleSchema.virtual('moduleId').get(function(){
    return this._id;
});

let Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
