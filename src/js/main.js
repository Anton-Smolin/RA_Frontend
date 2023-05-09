"use strict"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('body--touch');
} else {
    document.body.classList.add('body--mouse');
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('body--lock');
        iconMenu.classList.toggle('menu__icon--active');
        menuBody.classList.toggle('menu__body--active')
    });
}


// Плавный скролл
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

            if (iconMenu.classList.contains('menu__icon--active')) {
                document.body.classList.remove('body--lock');
                iconMenu.classList.remove('menu__icon--active');
                menuBody.classList.remove('menu__body--active')
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}


// Табы

const tabLink = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab__content');

tabLink.forEach(onTabClick);

function onTabClick(item) {
    item.addEventListener('click', function () {
        let currentTabLink = item;
        let tabId = currentTabLink.getAttribute('data-tab');
        let currentTabContent = document.querySelector(tabId);

        if (!currentTabLink.classList.contains('tab--active')) {
            tabLink.forEach(function (item) {
                item.classList.remove('tab--active');
            })

            tabContent.forEach(function (item) {
                item.classList.remove('tab__content--active');
            })

            currentTabLink.classList.add('tab--active');
            currentTabContent.classList.add('tab__content--active');
        }

    });
}

document.querySelector('.tab').click();



// Форма
const contactForm = document.getElementById('contact-form');

function handleSubmit(event) {
    event.preventDefault();

    const { name, phone } = event.target.elements;

    console.log({
        name: name.value,
        phone: phone.value
    });

    // Отправка данных fetch на бэкенд

    // Очистка формы
    this.reset();
}

contactForm.addEventListener('submit', handleSubmit);