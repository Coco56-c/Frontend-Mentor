const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');
const gridPart1 = document.querySelector('.gridpart1');
const overlay = document.querySelector('.overlay');

menuButton.addEventListener('click', () => {

    if (window.innerWidth <= 768) {

        if (!menu.classList.contains('menu-open')) {

            const gridHeight = gridPart1.getBoundingClientRect().height;

            const headerHeight = document.querySelector('.hautdepage').offsetHeight;

            const menuHeight = headerHeight + gridHeight;

            menu.style.height = `${menuHeight}px`;
            
            gridPart1.style.visibility = 'hidden';

        } else {

            gridPart1.style.visibility = 'visible';
        }
    }

    menu.classList.toggle('menu-open');
    overlay.classList.toggle('overlay-open');
    menuButton.classList.toggle('menu-button-open');
});


overlay.addEventListener('click', () => {

    menu.classList.remove('menu-open');
    overlay.classList.remove('overlay-open');
    menuButton.classList.remove('menu-button-open');

    if (window.innerWidth <= 768) {
        gridPart1.style.visibility = 'visible';
    }
});
