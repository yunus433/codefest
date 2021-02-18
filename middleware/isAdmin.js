// Check if there is admin field in session to see if admin login is complete or not

module.exports = (req, res, next) => {
  if (req.session && req.session.admin) {
    if (process.env.ROOT_ADMIN_PASSWORD == req.session.admin)
      return next()

    return res.redirect('/admin/login');
  } else {
    return res.redirect('/admin/login');
  };
};
