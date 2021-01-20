module.exports = (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'Ana Sayfa',
    includes: {
      external: ['css', 'js', 'fontawesome']
    },
    // images: [
    //   'https://res.cloudinary.com/codefest-org/image/upload/v1611085285/2017/IMG_1619_b8vfs4.jpg',
    //   'https://res.cloudinary.com/codefest-org/image/upload/v1611085288/2017/IMG_1521_f3ybx8.jpg',
    //   'https://res.cloudinary.com/codefest-org/image/upload/v1611085290/2017/IMG_7895_lhn5e8.jpg',
    //   'https://res.cloudinary.com/codefest-org/image/upload/v1611085315/2017/IMG_8045_lwoilt.jpg',
    //   'https://res.cloudinary.com/codefest-org/image/upload/v1611085324/2017/IMG_8124_fiagr8.jpg',
    //   'https://res.cloudinary.com/codefest-org/image/upload/v1611085325/2017/IMG_8173_kmfkwz.jpg',
    //   'https://res.cloudinary.com/codefest-org/image/upload/v1611085329/2017/IMG_7905_afvogl.jpg',
    //   'https://res.cloudinary.com/codefest-org/image/upload/v1611085329/2017/IMG_8337_steieh.jpg'
    // ]
  });
}
