const Application = require('../../models/application/Application');

module.exports = (req, res) => {
  Application.createApplication(req.body, err => {
    if (err) {
      res.status(500).write(err);
      return res.end();
    }

    return res.sendStatus(200);
  });
}
