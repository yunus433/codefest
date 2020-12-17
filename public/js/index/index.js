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

  // document.addEventListener('click', event => {
  //   if (event.target.classList.contains('landing-start-button') || (event.target.parentNode && event.target.parentNode.classList.contains('landing-start-button')) || event.target.classList.contains('second-page-down-button') || (event.target.parentNode && event.target.parentNode.classList.contains('second-page-down-button')))
  //     smoothScroll(window.innerHeight - 70, landingAllContent);

  //   if (event.target.classList.contains('landing-header-start-button'))
  //     document.querySelector('.contact-content-wrapper').scrollIntoView();

  //   if (event.target.classList.contains('contact-send-button') || event.target.parentNode.classList.contains('contact-send-button')) {
  //     generalErrorSpan.style.display = "none";
  //     alreadyRegisteredErrorSpan.style.display = "none";
  //     missingInformationErrorSpan.style.display = "none";
  //     finishedSpan.style.display = "none";

  //     if (!nameInput.value || !nameInput.value.length || !surnameInput.value || !surnameInput.value.length || !emailInput.value || !emailInput.value.length || !companyNameInput.value || !companyNameInput.value.length)
  //       return missingInformationErrorSpan.style.display = "block";
      
  //     const xhr = new XMLHttpRequest();
  //     xhr.open("POST", '/');
  //     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  //     xhr.send(JSON.stringify({
  //       name: nameInput.value,
  //       surname: surnameInput.value,
  //       email: emailInput.value,
  //       company_name: companyNameInput.value,
  //       details: detailsInput.value && detailsInput.value.length ? detailsInput.value : null
  //     }));
      
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState == XMLHttpRequest.DONE) {
  //         if (xhr.status == 200) 
  //           return finishedSpan.style.display = "block"
  //         else if (xhr.status == 400)
  //           return missingInformationErrorSpan.style.display = "block";
  //         else if (xhr.status == 500)
  //           return alreadyRegisteredErrorSpan.style.display = "block";
  //         else
  //           return generalErrorSpan.style.display = "block";
  //       }
  //     }
  //   }
  // });
}
