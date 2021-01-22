const moment = require('moment-timezone');
const mongoose = require('mongoose');
const validator = require('validator');

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
    default: moment().tz('Europe/Istanbul').format('DD[.]MM[.]YYYY[, ]HH[:]mm')
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

ApplicationSchema.statics.createApplication = function (newApplicationData, callback) {
  if (!newApplicationData || !newApplicationData.email || !newApplicationData.name || !newApplicationData.surname)
    return callback('bad_request');

  if (!validator.isEmail(newApplicationData.email))
    return callback('email_validation');
  
  if (newApplicationData.phone && !validator.isMobilePhone(newApplicationData.phone.split(' ').join('')))
    return callback('phone_validation');

  const Application = this;
  
  const newApplication = new Application({
    email: newApplicationData.email,
    name: newApplicationData.name,
    surname: newApplicationData.surname,
    phone: newApplicationData.phone.split(' ').join('') || null,
    details: newApplicationData.details || null
  });

  newApplication.save((err, application) => {
    if (err && err.code == 11000)
      return callback('email_duplication');
    if (err)
      return callback('unknown_error');

    return callback(null, application);
  });
};

ApplicationSchema.statics.deleteApplication = function (id, callback) {
  if (!id || !validator.isMongodbId(id))
    return callback('id_validation');

  const Application = this;

  Application.findById(mongoose.Types.ObjectId(id), (err, application) => {
    if (err || !application) return callback('document_not_found');

    Application.findByIdAndDelete(mongoose.Types.ObjectId(id), (err, application) => {
      if (err || !application) return callback('unknown_error');

      return callback(null, application);
    });
  });
};

module.exports = mongoose.model('Application', ApplicationSchema);
