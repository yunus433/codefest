module.exports = (req, res) => {
  return res.render('application/index', {
    page: 'application/index',
    title: 'Yarışmacı Başvurusu',
    includes: {
      external: ['css', 'js', 'fontawesome']
    }
  });
}
