const mongoose = require('mongoose');
const validator = require('validator');

module.exports = (id, callback) => {
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
}
