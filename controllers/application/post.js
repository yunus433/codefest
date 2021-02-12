const Application = require('../../models/application/Application');

module.exports = (req, res) => {
  Application.createApplication(req.body, err => {
    if (err && (err == 'bad_request' || err == 'email_validation' || err == 'phone_validation'))
      return res.sendStatus(400);

    if (err && err == 'email_duplication')
      return res.sendStatus(500);

    if (err && err == 'unknown_error')
      return res.sendStatus(404);

    return res.sendStatus(200);
  });
}
