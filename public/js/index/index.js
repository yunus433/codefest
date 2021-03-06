const smoothScrollLeft = (scrollAmount, contentWrapper) => {
  if (scrollAmount <= 0)
    return;

  contentWrapper.scrollBy(-10, 0);

  setTimeout(() => {
    smoothScrollLeft(scrollAmount-10, contentWrapper);
  }, 0.001);
}

const smoothScrollRight = (scrollAmount, contentWrapper) => {
  if (scrollAmount <= 0)
    return;

  contentWrapper.scrollBy(10, 0);

  setTimeout(() => {
    smoothScrollRight(scrollAmount-10, contentWrapper);
  }, 0.001);
}

const calculateColorPercentage = (scrollAmount, maxScrollAmount) => {
  return Math.min(1, (parseInt(Math.round(scrollAmount / maxScrollAmount * 100)) / 100.0));
}

window.onload = () => {
  const allHeader = document.querySelector('.all-header-wrapper');
  const allContent = document.querySelector('.all-content-wrapper');

  const startPageWrapper = document.querySelector('.start-page-wrapper');
  const aboutUsPageWrapper = document.querySelector('.about-us-page-wrapper');
  const infoOuterWrapper = document.querySelector('.info-outer-wrapper');
  const currentContestWrapper = document.querySelector('.current-contest-wrapper');
  const oldEventsWrapper = document.querySelector('.old-events-wrapper');
  const mediaWrapper = document.querySelector('.media-wrapper');

  const fullSizeImageWrapper = document.querySelector('.full-size-image-wrapper');
  const mediaInnerWrapper = document.querySelector('.media-inner-wrapper');
  let clickedImage;

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
      allHeader.style.backgroundColor = `rgba(0, 0, 20, ${calculateColorPercentage(allContent.scrollTop + 70, window.innerHeight)})`;
    } else {
      allHeader.style.backgroundColor = 'transparent';
    }
    
    document.querySelector('.each-all-header-button-selected').classList.remove('each-all-header-button-selected');
    document.querySelector('.each-all-header-button-selected').classList.remove('each-all-header-button-selected');

    if (allContent.scrollTop < startPageWrapper.offsetHeight - 70) {
      document.querySelectorAll('.main-page-button')[0].classList.add('each-all-header-button-selected');
      document.querySelectorAll('.main-page-button')[1].classList.add('each-all-header-button-selected');
    } else if (allContent.scrollTop < startPageWrapper.offsetHeight + currentContestWrapper.offsetHeight - 70) {
      document.querySelectorAll('.current-codefest-button')[0].classList.add('each-all-header-button-selected');
      document.querySelectorAll('.current-codefest-button')[1].classList.add('each-all-header-button-selected');
    } else if (allContent.scrollTop < startPageWrapper.offsetHeight + currentContestWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight - 70) {
      document.querySelectorAll('.about-us-page-button')[0].classList.add('each-all-header-button-selected'); 
      document.querySelectorAll('.about-us-page-button')[1].classList.add('each-all-header-button-selected'); 
    } else if (allContent.scrollTop < startPageWrapper.offsetHeight + currentContestWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight + oldEventsWrapper.offsetHeight - 70) {
      document.querySelectorAll('.old-events-button')[0].classList.add('each-all-header-button-selected');
      document.querySelectorAll('.old-events-button')[1].classList.add('each-all-header-button-selected');
    } else if (allContent.scrollTop < startPageWrapper.offsetHeight + currentContestWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight + oldEventsWrapper.offsetHeight + mediaWrapper.offsetHeight - 70) {
      document.querySelectorAll('.images-button')[0].classList.add('each-all-header-button-selected'); 
      document.querySelectorAll('.images-button')[1].classList.add('each-all-header-button-selected'); 
    }
  }

  mediaInnerWrapper.onscroll = () => {
    if (mediaInnerWrapper.scrollLeft > 0) {
      mediaInnerWrapper.parentElement.childNodes[0].classList.remove('not-allowed-button');
    } else {
      mediaInnerWrapper.parentElement.childNodes[0].classList.add('not-allowed-button');
    }

    if (mediaInnerWrapper.scrollWidth - mediaInnerWrapper.offsetWidth - mediaInnerWrapper.scrollLeft > 0) {
      mediaInnerWrapper.parentElement.childNodes[2].classList.remove('not-allowed-button');
    } else {
      mediaInnerWrapper.parentElement.childNodes[2].classList.add('not-allowed-button');
    }
  }

  document.addEventListener('click', event => {
    if (event.target.classList.contains('main-page-button')) {
      allContent.scrollTo(0, 0);
    } else if (event.target.classList.contains('current-codefest-button')) {
      allContent.scrollTo(0, startPageWrapper.offsetHeight - 70);
    } else if (event.target.classList.contains('about-us-page-button')) {
      allContent.scrollTo(0, startPageWrapper.offsetHeight + currentContestWrapper.offsetHeight - 70);
    }  else if (event.target.classList.contains('old-events-button')) {
      allContent.scrollTo(0, startPageWrapper.offsetHeight + currentContestWrapper.offsetHeight + aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight - 70);
    } else if (event.target.classList.contains('images-button')) {
      allContent.scrollTo(0, startPageWrapper.offsetHeight + currentContestWrapper.offsetHeight +  aboutUsPageWrapper.offsetHeight + infoOuterWrapper.offsetHeight + oldEventsWrapper.offsetHeight - 70);
    }

    if (event.target.parentNode.classList.contains('each-media-image')) {
      clickedImage = event.target.parentNode;
      const src = clickedImage.id;
      fullSizeImageWrapper.style.display = 'flex';
      fullSizeImageWrapper.childNodes[1].src = src;

      if (clickedImage.previousElementSibling) {
        fullSizeImageWrapper.childNodes[0].classList.remove('not-allowed-button');
      } else {
        fullSizeImageWrapper.childNodes[0].classList.add('not-allowed-button');
      }

      if (clickedImage.nextElementSibling) {
        fullSizeImageWrapper.childNodes[2].classList.remove('not-allowed-button');
      } else {
        fullSizeImageWrapper.childNodes[2].classList.add('not-allowed-button');
      }
    }

    if (event.target.classList.contains('full-size-image-wrapper')) {
      fullSizeImageWrapper.style.display = 'none';
      fullSizeImageWrapper.childNodes[1].src = '';
    }

    if (event.target.classList.contains('full-size-image-go-left-button') && clickedImage.previousElementSibling) {
      fullSizeImageWrapper.childNodes[1].src = '';
      clickedImage = clickedImage.previousElementSibling;
      const src = clickedImage.id;
      fullSizeImageWrapper.style.display = 'flex';
      fullSizeImageWrapper.childNodes[1].src = src;

      if (clickedImage.previousElementSibling) {
        fullSizeImageWrapper.childNodes[0].classList.remove('not-allowed-button');
      } else {
        fullSizeImageWrapper.childNodes[0].classList.add('not-allowed-button');
      }

      if (clickedImage.nextElementSibling) {
        fullSizeImageWrapper.childNodes[2].classList.remove('not-allowed-button');
      } else {
        fullSizeImageWrapper.childNodes[2].classList.add('not-allowed-button');
      }
    }

    if (event.target.classList.contains('full-size-image-go-right-button') && clickedImage.nextElementSibling) {
      fullSizeImageWrapper.childNodes[1].src = '';
      clickedImage = clickedImage.nextElementSibling;
      const src = clickedImage.id;
      fullSizeImageWrapper.style.display = 'flex';
      fullSizeImageWrapper.childNodes[1].src = src;

      if (clickedImage.previousElementSibling) {
        fullSizeImageWrapper.childNodes[0].classList.remove('not-allowed-button');
      } else {
        fullSizeImageWrapper.childNodes[0].classList.add('not-allowed-button');
      }

      if (clickedImage.nextElementSibling) {
        fullSizeImageWrapper.childNodes[2].classList.remove('not-allowed-button');
      } else {
        fullSizeImageWrapper.childNodes[2].classList.add('not-allowed-button');
      }
    }

    if (event.target.classList.contains('images-go-left-button')) {
      smoothScrollLeft(Math.min(mediaInnerWrapper.offsetWidth, mediaInnerWrapper.scrollLeft), mediaInnerWrapper);
    }

    if (event.target.classList.contains('images-go-right-button')) {
      smoothScrollRight(Math.min(mediaInnerWrapper.offsetWidth, mediaInnerWrapper.scrollWidth - mediaInnerWrapper.offsetWidth - mediaInnerWrapper.scrollLeft), mediaInnerWrapper);
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
