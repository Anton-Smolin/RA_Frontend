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


// Маска телефона
document.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.phone'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });
});


// Форма
const contactForm = document.getElementById('contact-form');

async function handleSubmit(event) {
    event.preventDefault();

    const { name, phone } = event.target.elements;

    console.log({
        name: name.value,
        phone: phone.value
    });

    // Отправка данных fetch на бэкенд
    let formData = new FormData(contactForm);

    let response = await fetch('', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        contactForm.reset();
    }

    // Очистка формы
    this.reset();
}

contactForm.addEventListener('submit', handleSubmit);