// Get /admin/applications

const Application = require('../../../models/application/Application');

module.exports = (req, res) => {
  Application.getApplications(req.query, (err, applications) => {
    if (err)
      return res.redirect('/admin');
    
      return res.render('admin/applications', {
        page: 'admin/applications',
        title: 'Yarışmacı Başvuruları',
        includes: {
          external: ['css', 'js', 'fontawesome']
        },
        applications
      });
  });
}
