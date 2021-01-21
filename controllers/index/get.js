module.exports = (req, res) => {
  return res.render('index/index', {
    page: 'index/index',
    title: 'Ana Sayfa',
    includes: {
      external: ['css', 'js', 'fontawesome']
    },
    images: [
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156892/2019/IMG_1793_kqrhzy.jpg',
        small: '/res/images/galery/2019/4.jpg',
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156898/2019/IMG_2007_tdyhb4.jpg',
        small: '/res/images/galery/2019/5.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156890/2019/IMG_2185_1_engnqc.jpg',
        small: '/res/images/galery/2019/3.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156881/2019/IMG_1913_enawm6.jpg',
        small: '/res/images/galery/2019/2.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156875/2019/IMG_1796_jrmors.jpg',
        small: '/res/images/galery/2019/1.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156858/2018/IMG_8168_tg22jz.jpg',
        small: '/res/images/galery/2018/6.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156859/2018/IMG_8340_p9vjnc.jpg',
        small: '/res/images/galery/2018/7.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156867/2018/IMG_8478_muvxjr.jpg',
        small: '/res/images/galery/2018/8.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156853/2018/IMG_8269_pgc2ry.jpg',
        small: '/res/images/galery/2018/5.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156844/2018/IMG_8184_evnrzh.jpg',
        small: '/res/images/galery/2018/4.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156837/2018/IMG_8259_lh9xhd.jpg',
        small: '/res/images/galery/2018/3.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156836/2018/IMG_8242_abnifq.jpg',
        small: '/res/images/galery/2018/2.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611156827/2018/IMG_8281_uksvf8.jpg',
        small: '/res/images/galery/2018/1.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611085285/2017/IMG_1619_b8vfs4.jpg',
        small: '/res/images/galery/2017/1.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611085288/2017/IMG_1521_f3ybx8.jpg',
        small: '/res/images/galery/2017/2.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611085290/2017/IMG_7895_lhn5e8.jpg',
        small: '/res/images/galery/2017/3.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611085315/2017/IMG_8045_lwoilt.jpg',
        small: '/res/images/galery/2017/4.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611085324/2017/IMG_8124_fiagr8.jpg',
        small: '/res/images/galery/2017/5.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611085325/2017/IMG_8173_kmfkwz.jpg',
        small: '/res/images/galery/2017/6.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611085329/2017/IMG_7905_afvogl.jpg',
        small: '/res/images/galery/2017/7.jpg'
      },
      {
        original: 'https://res.cloudinary.com/codefest-org/image/upload/v1611085329/2017/IMG_8337_steieh.jpg',
        small: '/res/images/galery/2017/8.jpg'
      }
    ]
  });
}
