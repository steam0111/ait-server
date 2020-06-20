const mongoose = require('mongoose')

const settingsSchema = mongoose.Schema({
  application_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  settings: {
    pages: {
      type: Object,
      required: true,
    },
    common: {
      type: Object,
    },
  },
})

settingsSchema.virtual('settingsId').get(function() {
  return this._id
})

let Settings = mongoose.model('Settings', settingsSchema)

module.exports = Settings
