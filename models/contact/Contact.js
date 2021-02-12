const moment = require('moment-timezone');
const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
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

ContactSchema.statics.createContact = function (newContactData, callback) {
  if (!newContactData || !newContactData.email || !newContactData.name || !newContactData.surname)
    return callback('bad_request');

  if (!validator.isEmail(newContactData.email))
    return callback('email_validation');
  
  if (newContactData.phone && !validator.isMobilePhone(newContactData.phone.split(' ').join('')))
    return callback('phone_validation');

  const Contact = this;
  
  const newContact = new Contact({
    email: newContactData.email,
    name: newContactData.name,
    surname: newContactData.surname,
    phone: newContactData.phone.split(' ').join('') || null,
    details: newContactData.details || null
  });

  newContact.save((err, contact) => {
    if (err && err.code == 11000)
      return callback('email_duplication');
    if (err)
      return callback('unknown_error');

    return callback(null, contact);
  });
};

ContactSchema.statics.deleteContact = function (id, callback) {
  if (!id || !validator.isMongodbId(id))
    return callback('id_validation');

  const Contact = this;

  Contact.findById(mongoose.Types.ObjectId(id), (err, contact) => {
    if (err || !contact) return callback('document_not_found');

    Contact.findByIdAndDelete(mongoose.Types.ObjectId(id), (err, contact) => {
      if (err || !contact) return callback('unknown_error');

      return callback(null, contact);
    });
  });
};

module.exports = mongoose.model('Contact', ContactSchema);
