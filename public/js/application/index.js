window.onload = () => {
  document.addEventListener('click', event => {
    if (event.target.classList.contains('each-selected-input') || event.target.parentNode.classList.contains('each-selected-input') || event.target.parentNode.parentNode.classList.contains('each-selected-input')) {
      let target = event.target;
      if (event.target.parentNode.classList.contains('each-selected-input'))
        target = event.target.parentNode;
      if (event.target.parentNode.parentNode && event.target.parentNode.parentNode.classList.contains('each-selected-input'))
        target = event.target.parentNode.parentNode;
      
      target.parentNode.childNodes[0].value = target.childNodes[1].innerHTML;
      if (document.querySelector('.selected-icon'))
        document.querySelector('.selected-icon').classList.remove('selected-icon');
      target.childNodes[0].classList.add('selected-icon');
    }
  });

  const form = document.querySelector('.form-wrapper');
  const formError = document.querySelector('.form-error');

  form.onsubmit = event => {
    event.preventDefault();
    const data = {
      email: document.getElementById('email-input').value,
      team_name: document.getElementById('team-name-input').value,
      competitors: {
        first: {
          name: document.getElementById('competitor-first-name-input').value,
          school_name: document.getElementById('competitor-first-school-input').value,
          school_email: document.getElementById('competitor-first-email-input').value,
          phone: document.getElementById('competitor-first-phone-input').value,
          class: document.getElementById('competitor-first-class-input').value,
        },
        second: {
          name: document.getElementById('competitor-second-name-input').value,
          school_name: document.getElementById('competitor-second-school-input').value,
          school_email: document.getElementById('competitor-second-email-input').value,
          phone: document.getElementById('competitor-second-phone-input').value,
          class: document.getElementById('competitor-second-class-input').value,
        }
      },
      teacher_name: document.getElementById('teacher-name-input').value,
      teacher_phone: document.getElementById('teacher-name-input').value,
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/application');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.send(JSON.stringify(data));

    formError.style.color = 'rgb(255, 0 , 0)';
    formError.innerHTML = '';

    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          formError.style.color = 'rgb(0, 255 , 0)';
          formError.innerHTML = 'Kaydınız başarıyla alınmıştır, teşekkür ederiz';
        } else if (xhr.status == 400) {
          formError.innerHTML = 'Lütfen formdaki bütün bilgileri doldurun';
        } else if (xhr.status == 500) {
          formError.innerHTML = 'Bu e-posta adresi ile zaten bir kayıt alınmış, lütfen iletişim e-postanızı değiştirin.';
        } else {
          formError.innerHTML = 'Bilinmeyen bir hata oluştu, lütfen daha sonra tekrar deneyin.';
        }
      }
    }
  }
}
