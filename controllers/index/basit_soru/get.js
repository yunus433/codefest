module.exports = (req, res) => {
  const alphabet = [
    'a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'ğ', 'h', 'ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'r', 's', 'ş', 't', 'u', 'ü', 'v', 'y', 'z'
  ];
  const alphabet2 = [
    'a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'ğ', 'h', 'ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'r', 's', 'ş', 't', 'u', 'ü', 'v', 'y', 'z'
  ];
  const text_list = {
    text1: 'tebrikler baltacı! şifreyi çözdün ve buraya gelmeye hak kazandın. puanı almak içinse tek yapman gereken bu basit bilmeceyi çözmek. sorun olursa bana yazma.',
    text2: 'açıl susam açıl',
    text3: 'beni mutlu etmek için',
    text4: 'önce en bire kadar çarpıl',
    text5: 'sonra altına keyi al da yazıl',
    text6: 've son sıfırlara takıl',
    text7: 'yine de beni anlamazsan',
    text8: 'sayfam yeniden açıl'
  };
  const text_list_hashed = {};

  alphabet2.sort(() => Math.random() - 0.5);

  for (let j = 1; j <= 8; j++) {
    const key = 'text' + j;
    let new_text = "";

    for (let i = 0; i < text_list[key].length; i++) {
      if (text_list[key][i] == ' ') {
        new_text += ' ';
        continue;
      }

      if (text_list[key][i] == '!') {
        new_text += '!';
        continue;
      }

      if (text_list[key][i] == '.') {
        new_text += '.';
        continue;
      }

      let index = 0;
      while (index < alphabet.length) {
        if (alphabet[index] == text_list[key][i])
          break;
        index++;
      }

      new_text += alphabet2[index];
    }

    text_list_hashed[key] = new_text;
  }

  return res.render('index/basit_soru', {
    page: 'index/basit_soru',
    title: 'Basit Soru',
    includes: {
      external: ['css', 'fontawesome']
    },
    text_list: text_list_hashed
  });
}
