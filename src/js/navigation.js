"use strict";
  let showNavigation = function () {
    let getNav = document.querySelector('.navigation');
    let getBurgerButton = document.querySelector('.btn-burger');
  
    getBurgerButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      getBurgerButton.classList.toggle('btn-burger--opened');
  
      if (getBurgerButton.classList.contains('btn-burger--opened')){
        getNav.classList.add('navigation--opened');
      } else {
        getNav.classList.remove('navigation--opened');
      }
    })
  } ();
