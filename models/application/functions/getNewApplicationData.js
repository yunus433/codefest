const validator = require('validator');

const isValidString = str => {
  if (str)
    str = str.trim();
  return str && str.length && str.length < 1000;
}

module.exports = (data, callback) => {
  if (!data || !data.email || !data.team_name)
    return callback('bad_request');

  if (!validator.isEmail(data.email))
    return callback('email_validation');

  if (!data.team_name || typeof data.team_name != 'string' || !data.team_name.trim().length || data.team_name.length > 1000)
    return callback('bad_request');

  if (!data.teacher_name || typeof data.teacher_name != 'string' || !data.teacher_name.trim().length || data.teacher_name.length > 1000)
    return callback('bad_request');

  if (data.teacher_phone && !isValidString(data.teacher_phone.split(' ').join('')))
    return callback('phone_validation');

  if (!data.competitors || typeof data.competitors != 'object')
    return callback('bad_request');

  if (!data.competitors.first || !data.competitors.second)
    return callback('bad_request');

  if (!isValidString(data.competitors.first.name) || !isValidString(data.competitors.first.school_name) || !isValidString(data.competitors.first.school_email) || !isValidString(data.competitors.first.phone) || !isValidString(data.competitors.first.class))
    return callback('bad_request');

  if (!isValidString(data.competitors.second.name) || !isValidString(data.competitors.second.school_name) || !isValidString(data.competitors.second.school_email) || !isValidString(data.competitors.second.phone) || !isValidString(data.competitors.second.class))
    return callback('bad_request');

  return callback(null, {
    email: data.email,
    team_name: data.team_name.trim(),
    teacher_name: data.teacher_name.trim(),
    teacher_phone: data.teacher_phone,
    competitors: {
      first: {
        name: data.competitors.first.name.trim(),
        school_name: data.competitors.first.school_name.trim(),
        school_email: data.competitors.first.school_email.trim(),
        phone: data.competitors.first.phone.trim(),
        class: data.competitors.first.class.trim()
      },
      second: {
        name: data.competitors.second.name.trim(),
        school_name: data.competitors.second.school_name.trim(),
        school_email: data.competitors.second.school_email.trim(),
        phone: data.competitors.second.phone.trim(),
        class: data.competitors.second.class.trim()
      }
    }
  });
}
