const moment = require('moment-timezone');
const mongoose = require('mongoose');

const createApplication = require('./functions/createApplication');
const deleteApplication = require('./functions/deleteApplication');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  created_at_unix: {
    type: Number,
    default: (new Date()).getTime()
  },
  created_at: {
    type: String,
    default: moment().tz('Turkey/Istanbul').format('DD[.]MM[.]YYYY[, ]HH[:]mm')
  },
  phone: {
    type: String,
    default: null
  },
  details: {
    type: String,
    default: null
  }
});

ApplicationSchema.statics.createApplication = createApplication.bind(this);
ApplicationSchema.statics.deleteApplication = deleteApplication.bind(this);

module.exports = mongoose.model('Application', ApplicationSchema);
