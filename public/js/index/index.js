const smoothScroll = (scrollAmount, contentWrapper) => {
  if (scrollAmount <= 0)
    return;

  contentWrapper.scrollBy(0, 5);

  setTimeout(() => {
    smoothScroll(scrollAmount-5, contentWrapper);
  }, 0.001);
}

const calculateColorPercentage = (scrollAmount, maxScrollAmount) => {
  return Math.max(0, 1.0 - (parseInt(Math.round(scrollAmount / maxScrollAmount * 100)) / 100.0));
}

window.onload = () => {
  const allHeaderOuterWrapper = document.querySelector('.all-header-outer-wrapper');
  const allHeader = document.querySelector('.all-header');
  const allContent = document.querySelector('.all-content');

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
      allHeader.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
      allHeaderOuterWrapper.style.backgroundColor = "rgb(248, 248, 248)";
      allHeader.style.backgroundColor = `rgba(217, 230, 245, ${calculateColorPercentage(allContent.scrollTop, window.innerHeight)})`;
    } else {
      allHeaderOuterWrapper.style.backgroundColor = "transparent";
      allHeader.style.boxShadow = "none";
      allHeader.style.backgroundColor = "transparent";
    }
  }

  document.addEventListener('click', event => {
    if (event.target.classList.contains('start-page-button') || (event.target.parentNode && event.target.parentNode.classList.contains('start-page-button')))
      smoothScroll(window.innerHeight - 70, allContent);

    if (event.target.classList.contains('all-header-aboutus-button'))
      document.querySelector('.aboutus-page-wrapper').scrollIntoView(false);

    if (event.target.classList.contains('all-header-awards-button'))
      document.querySelector('.awards-page-wrapper').scrollIntoView(false);

    if (event.target.classList.contains('all-header-contact-button'))
      document.querySelector('.form-page-wrapper').scrollIntoView(false);

    if (event.target.classList.contains('form-send-button') || event.target.parentNode.classList.contains('form-send-button')) {
      generalErrorSpan.style.display = "none";
      alreadyRegisteredErrorSpan.style.display = "none";
      missingInformationErrorSpan.style.display = "none";
      finishedSpan.style.display = "none";

      if (!nameInput.value || !nameInput.value.length || !surnameInput.value || !surnameInput.value.length || !emailInput.value || !emailInput.value.length)
        return missingInformationErrorSpan.style.display = "block";
      
      const xhr = new XMLHttpRequest();
      xhr.open("POST", '/');
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

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
            return finishedSpan.style.display = "block"
          else if (xhr.status == 400)
            return missingInformationErrorSpan.style.display = "block";
          else if (xhr.status == 500)
            return alreadyRegisteredErrorSpan.style.display = "block";
          else
            return generalErrorSpan.style.display = "block";
        }
      }
    }
  });
}
