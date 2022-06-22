// Служебные переменные
const d = document;
const body = document.querySelector('body');

// Служебные функции

function find(selector) {
    return document.querySelector(selector)
}

function findAll(selectors) {
    return document.querySelectorAll(selectors)
}

// Удаляет у всех элементов items класс itemClass
function removeAll(items, itemClass) {
    if (typeof items == 'string') {
        items = document.querySelectorAll(items)
    }
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        item.classList.remove(itemClass)
    }
}

function bodyLock(con) {
    if (con === true) {
        body.classList.add('_lock');
    } else if (con === false) {
        body.classList.remove('_lock');
    } else if (con === undefined) {
        if (!body.classList.contains('_lock')) {
            body.classList.add('_lock');
        } else {
            body.classList.remove('_lock')
        }
    } else {
        console.error('Неопределенный аргумент у функции bodyLock()')
    }
}

function faq() {
    let faqElements = d.querySelectorAll('.faq__questions-item');

    for (let i = 0; i < faqElements.length; i++) {
        faqElements[i].addEventListener('click', function() {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                if (d.querySelector('.faq__questions-item.active')) {
                    d.querySelector('.faq__questions-item.active').classList.remove('active');
                }
                this.classList.add('active');
            }
        });
    }
}

faq();

let previousPosition = window.pageYOffset || document.documentElement.scrollTop;
// When the user scrolls the page, execute myFunction
window.onscroll = function() { myFunction() };

// Get the header
var header = document.querySelector(".header");

// Get the offset position of the navbar
var sticky = 250;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    let currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        if (previousPosition > currentPosition) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    } else {
        header.classList.remove("sticky");
    }
    previousPosition = currentPosition;
}



// window.onscroll = function() {
//     var currentPosition = window.pageYOffset || document.documentElement.scrollTop;

//     if (previousPosition > currentPosition) {
//         header.classList.add("sticky");
//     } else {
//         header.classList.remove("sticky");
//     }

//     previousPosition = currentPosition;
// };





// Валидация формы
function validationForm() {
    const name = find('#user_name')
    const phone = find('#user_phone')
    const email = find('#user_email')

    let con = true

    for (let i = 0; i < [name, phone, email].length; i++) {
        const elem = [name, phone, email][i];
        const elemValue = elem.value.trim()

        if (elemValue === '') {
            elem.classList.add('_error')
            con = false
        } else {
            elem.classList.remove('_error')
            con = true
        }
    }

    return con
}







// Плавная прокрутка

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.querySelector(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}


function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}



let anchors = d.querySelectorAll('.anchor');
for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function() {
        let anchor = this.getAttribute('href');
        console.log(anchor)
        smoothScroll(anchor);
        if (this.closest('.header__nav--mobile')) {
            d.querySelector('.header__nav-burger').click();
        }
    });
}



// Функции для модальных окон
function modal() {


    // Открытие модальных окон при клике по кнопке

    function openModalWhenClickingOnBtn() {
        const btnsOpenModal = document.querySelectorAll('[data-modal-open]');


        d.addEventListener('click', function(e) {
            if (e.target.getAttribute('data-modal-open') || e.target.closest('[data-modal-open]')) {
                const dataBtn = e.target.dataset.modalOpen || e.target.closest('[data-modal-open]').dataset.modalOpen;
                const modal = document.querySelector(`#${dataBtn}`)
                openModal(modal)
                window.location.hash = dataBtn
            }
        });


        // for (let i = 0; i < btnsOpenModal.length; i++) {
        //     const btn = btnsOpenModal[i];

        //     btn.addEventListener('click', (e) => {
        //         const dataBtn = btn.dataset.modalOpen;
        //         const modal = document.querySelector(`#${dataBtn}`)
        //         openModal(modal)
        //         window.location.hash = dataBtn
        //     });
        // }
    }
    openModalWhenClickingOnBtn();

    // Открытие модального окна, если в url указан его id

    function openModalHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1)
            const modal = document.querySelector(`.modal#${hash}`)

            if (modal) openModal(modal)
        }
    }
    openModalHash();

    // Показываем/убираем модальное окно при изменения хеша в адресной строке
    function checkHash() {
        window.addEventListener('hashchange', e => {
            const hash = window.location.hash
            const modal = document.querySelector(`.modal${hash}`)

            if (find('.modal._show')) find('.modal._show').classList.remove('_show')
            if (modal && hash != '') openModal(modal)
        })
    }
    checkHash()

    // Закрытие модального окна при клике по заднему фону
    function closeModalWhenClickingOnBg() {
        document.addEventListener('click', (e) => {
            const target = e.target
            const modal = document.querySelector('.modal._show')

            if (modal && target.classList.contains('modal__body')) closeModal(modal)
        })
    }
    closeModalWhenClickingOnBg();

    // Закрытие модальных окон при клике по крестику
    function closeModalWhenClickingOnCross() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
            const closeThisModal = modal.querySelector('.modal__close')

            closeThisModal.addEventListener('click', () => {
                closeModal(modal)
            })
        }
    }
    closeModalWhenClickingOnCross();

    // Закрытие модальных окон при нажатии по клавише ESC
    function closeModalWhenClickingOnESC() {
        const modalElems = document.querySelectorAll('.modal')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];

            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') closeModal(modal)
            })
        }
    }
    closeModalWhenClickingOnESC();

    // Сброс id модального окна в url
    function resetHash() {
        const windowTop = window.pageYOffset
        window.location.hash = ''
        window.scrollTo(0, windowTop)
    }

    // Открытие модального окна
    function openModal(modal) {
        modal.classList.add('_show')
        bodyLock(true)
    }

    // Закрытие модального окна
    function closeModal(modal) {
        modal.classList.remove('_show')
        bodyLock(false)
        resetHash()
    }
}

modal();




// Куки
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/";
    document.cookie = c_name + "=" + c_value;
}

function getMyCookie(name) {
    var c = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    if (c) return c[2];
    else return "";
}

let cookieBtn = d.querySelector('#cookie-btn');

// cookieBtn.addEventListener('click', function(event){
//     event.preventDefault();
//     d.querySelector('.cookie').classList.remove('active');
//     setCookie("Cookie", 'yes', 1);
// });



document.addEventListener("DOMContentLoaded", function() {
    var cookieCheck = getMyCookie("Cookie");
    if (cookieCheck != 'yes') {
        d.querySelector('.cookie').classList.add('active');
        setCookie("Cookie", 'yes', 1);
    }

});

findAll('.section-information__tasks-slider-text').forEach(i => {
    if (i.scrollHeight > i.offsetHeight) {
        i.insertAdjacentHTML('beforeend', '<div class="section-information__tasks-slider-field-btn" data-modal-open="tasks-popup"><button class="section-information__tasks-slider-btn">Подробнее</button></div>');
    }
});


document.addEventListener('click', function(e) {
    if (e.target.classList.contains('section-information__tasks-slider-field-btn') ||
        e.target.closest('.section-information__tasks-slider-field-btn')) {
        let sing = e.target.closest('.section-information__tasks-slider-element').querySelector('.section-information__tasks-slider-sing').outerHTML;
        let text = e.target.closest('.section-information__tasks-slider-element').querySelector('.section-information__tasks-slider-text').outerHTML;
        document.querySelector('#tasks-popup .modal__content .tasks-popup-content') ? document.querySelector('#tasks-popup .modal__content .tasks-popup-content').remove() : '';
        document.querySelector('#tasks-popup .modal__content').insertAdjacentHTML('afterbegin', `
            <div class="tasks-popup-content">
                ${sing + text}
            </div>
        `);
    }
});

if (window.innerWidth > 768) {
    swiperCustom('auto', 16, '.mySwiper', '.varios-report');
}


// let swiperTasks = new Swiper(".swiperTasks", {
//     slidesPerView: 'auto',
//     spaceBetween: 12,
//     navigation: {
//         nextEl: ".section-information__tasks .swiper-button-next",
//         prevEl: ".section-information__tasks .swiper-button-prev",
//     },
// });


// let swiperStories = new Swiper(".swiperStories", {
//     slidesPerView: 'auto',
//     spaceBetween: 12,
//     breakpoints: {
//         768: {
//             spaceBetween: 24,
//         }
//     }
// });

swiperCustom('auto', 12, '.swiperStories', null, { 768: { spaceBetween: 24 } });
swiperCustom('auto', 12, '.swiperTasks', '.section-information__tasks');
swiperCustom('auto', 10, '.swiperRecommend');



function swiperCustom(slideCount, margin, element, elementParent, breakpoint = {}) {
    new Swiper(`${element}`, {
        slidesPerView: slideCount ? slideCount : 'auto',
        spaceBetween: margin ? margin : 0,
        navigation: {
            nextEl: `${elementParent} .swiper-button-next`,
            prevEl: `${elementParent} .swiper-button-prev`,
        },
        breakpoints: breakpoint
    });
}

const jsConfetti = new JSConfetti()



// file input add

document.addEventListener('change', function(e) {
    if (e.target.classList.contains('take-photo__upload--file')) {
        let file = e.target.files[0];
        let img = document.createElement('img');
        img.src = URL.createObjectURL(file)
        e.target.closest('.take-photo__upload--photo').style.cssText = `
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${img.src});
            background-position:center;
            background-size:cover;
        `;
        e.target.closest('.take-photo__upload--photo').classList.add('_active');
        e.target.closest('.take-photo__upload--photo').querySelector('.take-photo__upload-section-file').classList.add('_active-delete');
        e.target.value = '';
    }
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('_active-delete') || e.target.closest('._active-delete')) {
        e.target.closest('.take-photo__upload--photo').classList.remove('_active');
        e.target.closest('.take-photo__upload--photo').style = null
        e.target.closest('.take-photo__upload--photo').querySelector('.take-photo__upload-section-file').classList.remove('_active-delete')
    }
});

// file input add


findAll('.list-report-all__element').forEach(i => {
    i.addEventListener('click', () => {
        find('.list-report-all__element._active').classList.remove('_active');
        i.classList.add('_active');
    });
});