"use strict";

let showModalView = function () {
    let getModalOverlay = document.querySelector('.modal-overlay');
    let getModalButtons = document.querySelectorAll('[data-toggle=modal]');
    
    for (let i = 0; i < getModalButtons.length; i++) {
        let getModalButton = getModalButtons[i];
        let getLinkToModalView = getModalButton.dataset.target;
        let getModalView = document.querySelector('.'+ getLinkToModalView); 
        
        if (getLinkToModalView) {
            getModalButton.addEventListener ('click', (evt) => {
                evt.preventDefault();
                getModalOverlay.classList.add('modal-overlay--active');
                // getModalView.classList.add(getLinkToModalView + '--active');
                getModalView.classList.add('modal--active');
                
            })
            break;
        }
    }
} ();

let closeModalView = function () {
    let getModalOverlay = document.querySelector ('.modal-overlay');
    let getModalView = document.querySelector ('.modal')

    getModalOverlay.addEventListener ('click', (evt) => {
        evt.preventDefault();
        getModalOverlay.classList.remove('modal-overlay--active');
        getModalView.classList.remove('modal--active');
    })

    window.addEventListener ('keydown', (evt) => {
        if(evt.keyCode == 27){
            evt.preventDefault();
            getModalOverlay.classList.remove('modal-overlay--active');
            getModalView.classList.remove('modal--active');

        }
        
    })
} ();

