const $buttonModal = document.querySelector('.show-modal');
const $modalСontent = document.querySelector('.overlay');


$buttonModal.addEventListener('click', () => {

    $buttonModal.classList.toggle('open');
    if ($buttonModal.classList.contains('open')) {
        document.querySelector('.icon-close').style.display = 'flex';
        document.querySelector('.icon-menu').style.display = 'none';
    } else {
        document.querySelector('.icon-close').style.display = 'none';
        document.querySelector('.icon-menu').style.display = 'flex';
    }


});