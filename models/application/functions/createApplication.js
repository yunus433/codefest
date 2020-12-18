const validator = require('validator');

module.exports = (newApplicationData, callback) => {
  if (!newApplicationData || !newApplicationData.email || !newApplicationData.name || !newApplicationData.surname)
    return callback('bad_request');

  if (!validator.isEmail(newApplicationData.email))
    return callback('email_validation');
  
  if (newApplicationData.phone && !validator.isMobilePhone(newApplicationData.phone))
    return callback('phone_validation');

  const Application = this;
  
  const newApplication = new Application({
    email: newApplicationData.email,
    name: newApplicationData.name,
    surname: newApplicationData.surname,
    phone: newApplicationData.phone || null,
    details: newApplicationData.details || null
  });

  newApplication.save((err, application) => {
    if (err && err.code == 11000)
      return callback('email_duplication');
    if (err)
      return callback('unknown_error');

    return callback(null, application);
  });
}
