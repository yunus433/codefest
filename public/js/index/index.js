const smoothScrollDown = (scrollAmount, contentWrapper) => {
  if (scrollAmount <= 0)
    return;

  contentWrapper.scrollBy(0, 50);

  setTimeout(() => {
    smoothScrollDown(scrollAmount-50, contentWrapper);
  }, 0.001);
}

const smoothScrollUp = (scrollAmount, contentWrapper) => {
  if (scrollAmount <= 0)
    return;

  contentWrapper.scrollBy(0, -50);

  setTimeout(() => {
    smoothScrollUp(scrollAmount-50, contentWrapper);
  }, 0.001);
}

const calculateColorPercentage = (scrollAmount, maxScrollAmount) => {
  return Math.min(1, (parseInt(Math.round(scrollAmount / maxScrollAmount * 100)) / 100.0));
}

window.onload = () => {
  const allHeader = document.querySelector('.all-header-wrapper');
  const allContent = document.querySelector('.all-content-wrapper');

  const windowHeight = window.innerHeight;
  const startPageWrapper = document.querySelector('.start-page-wrapper');
  const aboutUsPageWrapper = document.querySelector('.about-us-page-wrapper');
  const infoOuterWrapper = document.querySelector('.info-outer-wrapper');
  const formPageWrapper = document.querySelector('.form-page-wrapper');
  const oldEventsWrapper = document.querySelector('.old-events-wrapper');
  const mediaWrapper = document.querySelector('.media-wrapper');

  const nameInput = document.getElementById('name-input');
  const surnameInput = document.getElementById('surname-input');
  const emailInput = document.getElementById('email-input');
  const phoneInput = document.getElementById('phone-input');
  const detailsInput = document.getElementById('details-input');

  const generalErrorSpan = document.getElementById('general-error-span');
  const alreadyRegisteredErrorSpan = document.getElementById('already-registered-error-span');
  const missingInformationErrorSpan = document.getElementById('missing-information-error-span');
  const finishedSpan = document.getElementById('finished-span');

  allContent.onscroll = () => {
    if (allContent.scrollTop >= 70) {
      allHeader.style.backgroundColor = `rgba(0, 0, 20, ${calculateColorPercentage(allContent.scrollTop, window.innerHeight)})`;
    } else {
      allHeader.style.backgroundColor = 'transparent';
    }
    
    document.querySelector('.each-all-header-button-selected').classList.remove('each-all-header-button-selected');
    document.querySelector('.each-all-header-button-selected').classList.remove('each-all-header-button-selected');

    if (allContent.scrollTop < startPageWrapper.offsetHeight - 70) {
      document.querySelectorAll('.main-page-button')[0].classList.add('each-all-header-button-selected');
      document.querySelectorAll('.main-page-button')[1].classList.add('each-all-header-button-selected');
    } else if (allContent.scrollTop < startPageWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight - 70) {
      document.querySelectorAll('.about-us-page-button')[0].classList.add('each-all-header-button-selected');
      document.querySelectorAll('.about-us-page-button')[1].classList.add('each-all-header-button-selected');
    } else if (allContent.scrollTop < startPageWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight + formPageWrapper.offsetHeight - 70) {
      document.querySelectorAll('.current-codefest-button')[0].classList.add('each-all-header-button-selected'); 
      document.querySelectorAll('.current-codefest-button')[1].classList.add('each-all-header-button-selected'); 
    } else if (allContent.scrollTop < startPageWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight + formPageWrapper.offsetHeight + oldEventsWrapper.offsetHeight - 70) {
      document.querySelectorAll('.old-events-button')[0].classList.add('each-all-header-button-selected');
      document.querySelectorAll('.old-events-button')[1].classList.add('each-all-header-button-selected');
    } else if (allContent.scrollTop < startPageWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight + formPageWrapper.offsetHeight + oldEventsWrapper.offsetHeight + mediaWrapper.offsetHeight - 70) {
      document.querySelectorAll('.images-button')[0].classList.add('each-all-header-button-selected'); 
      document.querySelectorAll('.images-button')[1].classList.add('each-all-header-button-selected'); 
    }
  }

  document.addEventListener('click', event => {
    if (event.target.classList.contains('main-page-button')) {
      allContent.scrollTo(0, 0);
    } else if (event.target.classList.contains('about-us-page-button')) {
      allContent.scrollTo(0, startPageWrapper.offsetHeight - 70);
    } else if (event.target.classList.contains('current-codefest-button')) {
      allContent.scrollTo(0, startPageWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight - 70);
    } else if (event.target.classList.contains('old-events-button')) {
      allContent.scrollTo(0, startPageWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight + formPageWrapper.offsetHeight - 70);
    } else if (event.target.classList.contains('images-button')) {
      allContent.scrollTo(0, startPageWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight + formPageWrapper.offsetHeight + oldEventsWrapper.offsetHeight - 70);
    }

    if (event.target.classList.contains('form-send-button') || event.target.parentNode.classList.contains('form-send-button')) {
      generalErrorSpan.style.display = 'none';
      alreadyRegisteredErrorSpan.style.display = 'none';
      missingInformationErrorSpan.style.display = 'none';
      finishedSpan.style.display = 'none';

      if (!nameInput.value || !nameInput.value.length || !surnameInput.value || !surnameInput.value.length || !emailInput.value || !emailInput.value.length)
        return missingInformationErrorSpan.style.display = 'block';
      
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/');
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      xhr.send(JSON.stringify({
        name: nameInput.value,
        surname: surnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value && phoneInput.value.length ? phoneInput.value : null,
        details: detailsInput.value && detailsInput.value.length ? detailsInput.value : null
      }));
      
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) 
            return finishedSpan.style.display = 'block'
          else if (xhr.status == 400)
            return missingInformationErrorSpan.style.display = 'block';
          else if (xhr.status == 500)
            return alreadyRegisteredErrorSpan.style.display = 'block';
          else
            return generalErrorSpan.style.display = 'block';
        }
      }
    }
  });
}
