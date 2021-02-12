const moment = require('moment-timezone');
const mongoose = require('mongoose');
const validator = require('validator');

const getNewApplicationData = require('./functions/getNewApplicationData');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  team_name: {
    type: String,
    required: true
  },
  competitors: {
    type: Object,
    required: true,
    default: {
      first: {
        name: '',
        school_name: '',
        school_email: '',
        phone: '',
        class: ''
      },
      second: {
        name: '',
        school_name: '',
        school_email: '',
        phone: '',
        class: ''
      }
    }
  },
  teacher_name: {
    type: String,
    required: true
  },
  teacher_phone: {
    type: String,
    required: true
  }
});

ApplicationSchema.statics.createApplication = function (newApplicationData, callback) {
  getNewApplicationData(newApplicationData, (err, data) => {
    if (err)
      return callback(err);

    const Application = this;
  
    const newApplication = new Application(data);
  
    newApplication.save((err, application) => {
      if (err && err.code == 11000)
        return callback('email_duplication');
      if (err)
        return callback('unknown_error');
  
      return callback(null, application._id.toString());
    });
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
