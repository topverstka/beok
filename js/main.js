// Служебные переменные
const d = document;
const body = document.querySelector('body');
const SCREEN_TABLET = 992;

// Служебные функции

function find(selector) {
    return document.querySelector(selector)
}

function findAll(selectors) {
    return document.querySelectorAll(selectors)
}



function browser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera'
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        return 'IE';
    }
    return 'unknown';
}



document.querySelector('body').classList.add(browser());

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



customHeaderMobile();

let previousPosition = window.pageYOffset || document.documentElement.scrollTop;
// When the user scrolls the page, execute myFunction
var header = document.querySelector(".header.header--sticky");
if (header) {
    window.onscroll = function() { myFunction() };
}

// Get the header



let flScroll = false;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    // Get the offset position of the navbar
    var sticky = find('.section-questionnaire--progress:not(.progress-fixed-menu)') ? find('.section-questionnaire--progress:not(.progress-fixed-menu)').getBoundingClientRect().y : 250;

    let currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    let positionBottom = !find('[data-custom]') ? window.scrollY + 100 <= document.documentElement.scrollHeight - document.documentElement.clientHeight : 1;
    if (!find('.section-account__title') && !find('.guide-content')) {
        if (window.pageYOffset > sticky && positionBottom) {
            if (!find('.header-top-mobile')) find('body').style.paddingTop = (header.scrollHeight + parseInt(window.getComputedStyle(header).marginBottom)) + 'px';
            header.classList.add("sticky");
            if (find('.section-account__submit') && window.screen.width < SCREEN_TABLET) {
                find('.section-account__submit').classList.add("_active-fixed");
            }
            if (!find('[data-custom]')) {
                if (previousPosition > currentPosition) {
                    header.classList.add("sticky");
                    if (find('.section-account__submit') && window.screen.width < SCREEN_TABLET) {
                        find('.section-account__submit').classList.add("_active-fixed");
                    }
                } else {
                    if (find('.section-account__submit') && window.screen.width < SCREEN_TABLET) {
                        find('.section-account__submit').classList.remove("_active-fixed");
                    }
                    header.classList.remove("sticky");
                    find('body').style.paddingTop = null;

                }
            }
        } else {
            if (find('.section-account__submit') && window.screen.width < SCREEN_TABLET) {
                find('.section-account__submit').classList.remove("_active-fixed");
            }
            header.classList.remove("sticky");
            find('body').style.paddingTop = null;
        }
    }
    previousPosition = currentPosition;


    if (find('.section-account__title')) {
        if (find('.section-account__title').getBoundingClientRect().top <= 0 && window.screen.width < SCREEN_TABLET) {

            // header.style.height = 64 + 'px';


            header.classList.add("sticky");
            find('.section-account__submit').classList.add("_active-fixed");
            find('body').style.marginTop = 42 + 'px';


        } else {
            header.style = null;
            header.classList.remove("sticky");
            find('.section-account__submit').classList.remove("_active-fixed");
            find('body').style = null;


        }
    }
}





function defineMarginContent() {
    if ((window.outerWidth || window.screen.width) > SCREEN_TABLET && (find('.general-menu') || find('.section-chat'))) {
				// Временно отключилось само при переделывании чатаотключилось само
        // let paddingScrollBar = window.getComputedStyle(find('.general-menu')).paddingRight ?
        // window.getComputedStyle(find('.general-menu')).paddingRight :
        // window.getComputedStyle(find('.section-chat')).paddingRight;
        let widthScrollBar = find('.general-menu') ? find('.general-menu').scrollWidth : find('.section-chat').scrollWidth;
        find('.page-content').style.marginLeft = `${widthScrollBar}px`;
    } else {
        find('.page-content') ? find('.page-content').style.marginLeft = 0 : '';
    }
}
defineMarginContent();


function heightSlideTasks() {
    let dopHeigh = window.innerWidth > 1700 ? 0 : 0;
    if (find('.section-information__billboard')) {
        findAll('.section-information__tasks-slider-element').forEach(i => {
            i.style.height = find('.section-information__billboard').offsetHeight + 'px';
            let paddingElement = parseInt(window.getComputedStyle(i).padding);
            let plashka = i.querySelector('.section-information__tasks-slider-sing').offsetHeight;
            let marginPlashka = parseInt(window.getComputedStyle(i.querySelector('.section-information__tasks-slider-sing')).marginBottom);
            i.querySelector('.section-information__tasks-slider-text').style.height = (i.scrollHeight - paddingElement - plashka - marginPlashka + dopHeigh) - paddingElement + 'px';
        });
    }
}

function showBtnsMore() {
    findAll('.section-information__tasks-slider-text').forEach(i => {
        if (i.scrollHeight > i.offsetHeight) {
            // const lineHeight = parseInt(getComputedStyle(i).lineHeight);
            // const lines = Math.floor(i.offsetHeight / lineHeight);

            // i.style = `height: ${lineHeight * lines}px`;
            let offsetCoords = i.offsetHeight - 20;
            i.insertAdjacentHTML('beforeend', `<div class="section-information__tasks-slider-field-btn" data-modal-open="tasks-popup"><button class="section-information__tasks-slider-btn">Подробнее</button></div>`);

        }
    });
}

window.addEventListener('DOMContentLoaded', () => showBtnsMore());


window.innerWidth > SCREEN_TABLET ? heightSlideTasks() : '';


window.addEventListener('resize', function(e) {
    defineMarginContent();

    //if (window.innerWidth > SCREEN_TABLET) {
    heightSlideTasks();
    calculateChatSizes();
    hideArrowSlider('.varios-report__bottom .swiper', '.varios-report__bottom .swiper .swiper-slide', 0.5);
    hideArrowSlider('.swiperTasks', '.swiperTasks .swiper-slide', 0.2);
    hideArrowSlider('.swiperRecommend', '.swiperRecommend .swiper-slide', 0.8);
    //}
});


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

// function checkForms() {
//     const forms = document.querySelectorAll('form');

//     forms.forEach((form) => {
//         const submitNode = form.querySelector('[type=submit]');
//         if (!submitNode) return;

//         submitNode.disabled = true;

//         form.addEventListener('change', () => {
//             submitNode.disabled = false;
//         }, { once: true });
//     });
// }

// checkForms();


document.querySelectorAll('form input[type="submit"]:not(.not-disabled)').forEach(i => i.disabled = true);


const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};



const messageTextFields = document.querySelectorAll('.message-push--field');
messageTextFields.forEach(message => {
	message.rows = "1";
})

function shiftHeaderOffset() {
	const header = document.querySelector('.header')
	setTimeout(() => {
		document.querySelector('body').classList.add('is-keyboard')
		header.style.bottom = window.innerHeight - header.getBoundingClientRect().height  + 'px';
	}, 350)
}
function resetHeaderOffset() {
	const header = document.querySelector('.header')
	document.querySelector('body').classList.remove('is-keyboard')
	header.style.bottom = '';
}

const messageTextarea = document.querySelector('.message-push--field');
if (messageTextarea) {
	messageTextarea.addEventListener('focus', () => {
		shiftHeaderOffset()
	})
	messageTextarea.addEventListener('blur', () => {
		resetHeaderOffset()
	})
}

if (messageTextarea) {
	window.addEventListener('resize', (e) => {
			const event = new Event("blur");
			document.querySelector('.message-push--field').dispatchEvent(event);
	})
}

let numberTemporary;
let flDisabledFalse = false;
let previosMessageFieldHeight = 0;
let previosScrollHeight = 0;
const CHAT_MAX_HEIGHT = 165; //9 строк
const messageScreen = document.querySelector('.message-page');

function isLineRemoved(targetElement, previosScrollHeight) {
	return targetElement.scrollHeight < previosScrollHeight
}
function isLineAdded(targetElement, previosScrollHeight) {
	return targetElement.scrollHeight > previosScrollHeight
}
function getChatOffsetValue(target, previosMessageFieldHeight) {
	return target.getBoundingClientRect().height - previosMessageFieldHeight;
}
function changeChatOffset(target, previosMessageFieldHeight, messageScreen) {
	messageScreen.scrollTop += getChatOffsetValue(target, previosMessageFieldHeight);
	// messageScreen.scrollTo({
	// 	top: messageScreen.scrollTop + getChatOffsetValue(target, previosMessageFieldHeight),
	// 	left: 0,
	// 	behavior: 'smooth'
	// })
}

document.addEventListener('input', function(e) {

    if (e.target.hasAttribute('data-number')) {
        e.target.value = e.target.value.replace(/[^\d,.]*/g, '').replace(/([,.])[,.]+/g, '$1').replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1');
        if (e.target.value.split('').length > 0) flDisabledFalse = true;
    }


    if (e.target.hasAttribute('data-step')) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }

    if (e.target.classList.contains('message-push--field')) {
        if (e.target.value !== '') {
            if (!e.target.closest('.message-push').querySelector('.message-send')) {
                e.target.insertAdjacentHTML('afterend', `
            <button class="message-send">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#467EF3"/>
                    <path d="M11.6249 15.8214L14.4374 18.5L20.9999 12.25" stroke="white" stroke-width="1.50937" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            `);
                e.target.closest('.message-push').classList.add('_active-mess');
            }

            if (numberTemporary === undefined) numberTemporary = e.target.scrollHeight;

						// Снимает размеры до измнения высоты чата перед функцией changeChatOffset()
						previosScrollHeight = e.target.scrollHeight;
						previosMessageFieldHeight = e.target.getBoundingClientRect().height

            if (numberTemporary !== e.target.scrollHeight && e.target.scrollHeight <= CHAT_MAX_HEIGHT) {
                e.target.style.height = '1px'; // Для проверки реальной высоты textarea
                e.target.style.height = e.target.scrollHeight + 3 + "px";
                e.target.closest('form').classList.add('align-end');
                // find('.message-page').style.paddingBottom = e.target.scrollHeight + "px";
            } else {
                if (numberTemporary >= e.target.scrollHeight) {
                    e.target.closest('form').classList.remove('align-end');
                    // find('.message-page').style.paddingBottom = null;
                }
            }

						/*
						// Проверка измненеия направления чата
						if (isLineRemoved(e.target, previosScrollHeight)) {
							console.log('Уменьшить чат');
						} else if (isLineAdded(e.target, previosScrollHeight)) {
							console.log('Увеличить чат');
						}
						*/
						changeChatOffset(e.target, previosMessageFieldHeight, messageScreen)

        } else {
            if (e.target.closest('.message-push').querySelector('.message-send')) {
                e.target.closest('.message-push').querySelector('.message-send').remove();
                // e.target.closest('form').classList.remove('align-end');
                // e.target.closest('.message-push').classList.remove('_active-mess');
            }
            e.target.style = null;
        }
    }



    if (e.target.closest('form')) {
        let arrValueBool = [];
        let valueField = [...e.target.closest('form').querySelectorAll('.required')].every(i => i.value !== '');
        let valueFieldRadio = [...e.target.closest('form').querySelectorAll('input[type="checkbox"].required')].every(i => i.checked);
        let valueMail = e.target.closest('form').querySelector('#mail') ? validateEmail(e.target.closest('form').querySelector('#mail').value) : true;

        e.target.closest('form').querySelectorAll('.required').forEach(i => {
            if (i.tagName !== 'INPUT') {
                i.querySelector('input:checked') ? arrValueBool.push(true) : arrValueBool.push(false);
            }
        });

        flDisabledFalse = true;

        if (!valueMail && e.target.id === 'mail') {
            e.target.classList.add('_error');
            // e.target.value = e.target.validationMessage;
            !e.target.parentElement.querySelector('.error-message') ? e.target.parentElement.insertAdjacentHTML('beforeend', '<p class="error-message">Не правильно заполнено поле</p>') : false;
        } else {
            e.target.classList.remove('_error');
            e.target.parentElement.querySelector('.error-message') ? e.target.parentElement.querySelector('.error-message').remove() : false;
        }

        if (e.target.closest('form').querySelector('input[type="submit"]')) {
            if (valueField && valueFieldRadio && !arrValueBool.includes(false) && valueMail && flDisabledFalse) {
                e.target.closest('form').querySelector('input[type="submit"]').disabled = false;
            } else {
                e.target.closest('form').querySelector('input[type="submit"]').disabled = true;
            }
        }


        if (e.target.hasAttribute('data-popup-checkbox') && e.target.checked) {
            let allCheked = [...e.target.closest('form').querySelectorAll('[data-popup-checkbox]')].every(i => i.checked);
            allCheked ? e.target.closest('form').querySelector('input[type="submit"]').disabled = false : false;
        }



    }

});

// document.addEventListener('submit', function(e) {
//     if (e.target.closest('form') && e.target.querySelector('input[type="submit"]').hasAttribute('disabled')) {
//         e.preventDefault();
//     }

// });


// Маска даты ДД.ММ.ГГГГ
const maskDate = value => {
    let v = value.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 4) {
        return `${v.slice(0,2)}.${v.slice(2,4)}.${v.slice(4)}`;
    } else if (v.length >= 3) {
        return `${v.slice(0,2)}.${v.slice(2)}`;
    }
    return v
}


class formSubmit {
    handleEvent(e) {
        switch (e.type) {
            case 'submit':
                if (e.target.closest('form') && e.target.querySelector('input[type="submit"]').hasAttribute('disabled')) {
                    e.preventDefault();
                }
                break;
            case 'keydown':
                if (window.innerWidth < SCREEN_TABLET) {
                    if (e.keyCode === 13 && !find('.message-push--field')) {
                        e.preventDefault();
                    }
                }
                break;
            case 'keyup':
                if (e.target.id === 'birthday' && (e.keyCode !== 8)) {
                    //if (e.target.value.length >= 10) return;
                    e.target.value = maskDate(e.target.value)
                }
                break;
        }
    }
}

let innerFormSubmit = new formSubmit();

document.addEventListener('submit', innerFormSubmit);
document.addEventListener('keyup', innerFormSubmit);
document.addEventListener('keydown', innerFormSubmit);


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
        smoothScroll(anchor);
        if (this.closest('.header__nav--mobile')) {
            d.querySelector('.header__nav-burger').click();
        }
    });
}


function addElementInLottie(element, fileJson) {
    let container = document.getElementById(element);
    container.classList.add('_show');
    let params = {
        container: container,
        path: fileJson,
        renderer: 'svg',
        loop: false,
        autoplay: true,
    };

    let anim;
    anim = bodymovin.loadAnimation(params);
    anim.play();
    setTimeout(() => {
        container.classList.remove('_show');
        anim.destroy();
    }, 1200);
}


let timeId;
let flageTimeout = false;

function loader(delay) {
    let iteration = 0;
    let flageLoading = false;
    let countElement = findAll('.loader-cyrcle span').length - 1;
    flageTimeout = false;
    timeId = setTimeout(function run() {
        if (flageLoading) {
            find('.loader-cyrcle span._active').classList.remove('_active');
            flageLoading = false;
        }
        findAll('.loader-cyrcle span')[iteration].classList.add('_active');
        if (findAll('.loader-cyrcle span')[iteration - 1]) findAll('.loader-cyrcle span')[iteration - 1].classList.remove('_active');
        if (iteration === countElement) {
            iteration = 0;
            flageLoading = true;
        } else {
            iteration++;
        }


        if (flageTimeout) {
            clearTimeout(run);
            find('.loader-cyrcle span._active').classList.remove('_active');
        } else {
            setTimeout(run, delay);
        }

    }, delay);
}



function clearTime() {
    flageTimeout = true;
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
                window.location.hash = dataBtn;


                switch (dataBtn) {
                    case 'alert-by':
                        addElementInLottie('confetti', 'confetti.json');
                        break;
                    default:
                        break;
                }



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

            switch (hash) {
                case 'loader':
                    loader(150);
                    break;
                default:
                    break;
            }


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


            switch (hash) {
                case '#loader':
                    loader(150);
                    break;
                default:
                    break;
            }
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
        setTimeout(() => modal.classList.add('time-show-overflow'), 500)
    }

    // Закрытие модального окна
    function closeModal(modal) {
        modal.classList.remove('_show')
        bodyLock(false)
        resetHash()
        modal.classList.remove('time-show-overflow')
        switch (modal.id) {
            case 'loader':
                clearTime();
                break;
            default:
                break;
        }
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



// document.addEventListener("DOMContentLoaded", function() {
//     var cookieCheck = getMyCookie("Cookie");
//     if (cookieCheck != 'yes') {
//         d.querySelector('.cookie').classList.add('active');
//         setCookie("Cookie", 'yes', 1);
//     }

// });

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
        find('#tasks-popup  .section-information__tasks-slider-text').style = null;
    }
});

if (window.innerWidth > SCREEN_TABLET) {
    swiperCustom('auto', 16, '.mySwiper', '.varios-report');
}

swiperCustom('auto', 12, '.swiperStories', null, { SCREEN_TABLET: { spaceBetween: 24 } });
swiperCustom('auto', 12, '.swiperTasks', '.section-information__tasks');
swiperCustom('auto', 10, '.swiperRecommend', '.reports-all-section__content--recommendation');



function swiperCustom(slideCount, margin, element, elementParent, breakpoint = {}) {
    new Swiper(`${element}`, {
        nested: true,
        freeMode: {
            // enabled: true,
            // sticky: true,
        },
        slidesPerView: slideCount ? slideCount : 'auto',
        spaceBetween: margin ? margin : 0,
        mousewheel: {
            invert: false,
            forceToAxis: true,
            // thresholdDelta: 0,
        },

        navigation: {
            nextEl: `${elementParent} .swiper-button-next`,
            prevEl: `${elementParent} .swiper-button-prev`,
        },
        breakpoints: breakpoint
    });
}




document.addEventListener('change', function(e) {
    // file input add
    if (e.target.classList.contains('take-photo__upload--file') && !e.target.classList.contains('_active-delete')) {
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
    // file input add


    // При заполнение всех полей вылетают конфетти
    if (e.target.classList.contains('check-list__form-field--input')) {
        let inputChecked = [...e.target.closest('form').querySelectorAll('.check-list__form-field--input')].every(i => i.checked);
        if (inputChecked) {
            addElementInLottie('confetti', 'confetti.json');
        }
    }

});


window.addEventListener('change', function(e) {
    if (e.target.tagName === 'INPUT' && e.target.closest('.field-radio-line__elemement')) {
        if (e.target.nextElementSibling.innerText === 'Да') {
            e.target.closest('.field-radio-line').querySelector('.field-checkbox') ? e.target.closest('.field-radio-line').querySelector('.field-checkbox').style.display = 'block' : '';
        } else {
            e.target.closest('.field-radio-line').querySelector('.field-checkbox') ? e.target.closest('.field-radio-line').querySelector('.field-checkbox').style = null : '';
        }
    }
});

let returnElementDeligitaion = (event, element) => event.target.classList.contains(element.replace(/[^a-zа-яё0-9\s]/gi, ' ')) || event.target.closest(element);

let heightVariable;
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('_active-delete') || e.target.closest('._active-delete')) {
        e.target.closest('.take-photo__upload--photo').classList.remove('_active');
        e.target.closest('.take-photo__upload--photo').style = null
        e.target.closest('.take-photo__upload--photo').querySelector('.take-photo__upload-section-file').classList.remove('_active-delete')
    }

    if (returnElementDeligitaion(e, '.login-form__view')) {
        e.preventDefault();
        if (e.target.closest('div').querySelector('input[type="password"]')) {
            e.target.closest('div').querySelector('input[type="password"]').setAttribute('type', 'text');
            e.target.closest('div').querySelector('.login-form__view svg use').setAttribute('xlink:href', './img/icons-sprite.svg#password-not');
        } else {
            e.target.closest('div').querySelector('input[type="text"]').setAttribute('type', 'password');
            e.target.closest('div').querySelector('.login-form__view svg use').setAttribute('xlink:href', './img/icons-sprite.svg#password-view')
        }

    }


    if (e.target.hasAttribute('data-url')) {
        location.href = e.target.getAttribute('data-url');
    }


    if (returnElementDeligitaion(e, '.line-chart__top--dropdown') && !returnElementDeligitaion(e, '.line-chart__top--dropdown-list')) {
        let dropdownTarget = e.target.closest('.line-chart__top--dropdown') ? e.target.closest('.line-chart__top--dropdown') : e.target.classList.contains('line-chart__top--dropdown');
        let dropdownList = dropdownTarget.querySelector('.line-chart__top--dropdown-list');
        if (!dropdownTarget.classList.contains('_show')) {
            findAll('.line-chart__top--dropdown').forEach(i => { i.classList.remove('_show') });
            dropdownTarget.classList.add('_show');
        } else {
            dropdownTarget.classList.remove('_show');
        }

        if (window.innerWidth < SCREEN_TABLET) {
            dropdownList.classList.add('_active');
            document.body.classList.add('_active_dropdown');
        }

        dropdownTarget.querySelectorAll('.line-chart__top--dropdown-list li').forEach(i => {

        });
        // if (e.target.classList.contains('line-chart__top--dropdown-element')
        // }
    }


    if (e.target.getAttribute('data-chart-tab')) {
        let tabActive = e.target.getAttribute('data-chart-tab');
        e.target.closest('[data-chard-parent]').querySelector('.chart-tab._show').classList.remove('_show');
        e.target.closest('[data-chard-parent]').querySelector(`[data-chart-body="${tabActive}"]`).classList.add('_show');

    }


    if (returnElementDeligitaion(e, '.line-chart__top--dropdown-list') && returnElementDeligitaion(e, '.line-chart__top--dropdown-element')) {
        let textBox = e.target.closest('.line-chart__top--dropdown').querySelector('.line-chart__top--dropdown--select-p');
        textBox.innerText = e.target.innerText;
        e.target.closest('.line-chart__top--dropdown-list').querySelector('.line-chart__top--dropdown-element._active').classList.remove('_active');
        e.target.classList.add('_active');
        e.target.closest('.line-chart__top--dropdown-list').classList.remove('_active');
        e.target.closest('.line-chart__top--dropdown').classList.remove('_show');
        window.innerWidth < SCREEN_TABLET ? document.body.classList.remove('_active_dropdown') : '';
    }



    if (!e.target.classList.contains('line-chart__top--dropdown') && !e.target.closest('.line-chart__top--dropdown')) {
        findAll('.line-chart__top--dropdown').forEach(i => {
            i.classList.remove('_show');
            setTimeout(() => {
                i.querySelector('.line-chart__top--dropdown-list').classList.remove('_active');
            }, 10);

        });
        document.body.classList.remove('_active_dropdown');
    }


    // dropdown
    if (e.target.closest('.reports-all-section') &&
        (e.target.dataset.dropdownBtn || e.target.closest('[data-dropdown-btn]'))) {
        let heightChildElement = e.target.closest('[data-dropdown-parent]').querySelector('[data-dropdown-body]').scrollHeight;
        if (!e.target.closest('[data-dropdown-parent]').classList.contains('_dropdown-show')) {
            e.target.closest('.reports-all-section').style.height = heightChildElement + e.target.closest('.reports-all-section').scrollHeight + 'px';
        } else {
            e.target.closest('.reports-all-section').style.height = e.target.closest('.reports-all-section').scrollHeight - heightChildElement + 'px';
        }
    }


    if (e.target.dataset.dropdownBtn || e.target.closest('[data-dropdown-btn]')) {
        let targetParent = e.target.closest('[data-dropdown-parent]');
        let targetBody = targetParent.querySelector('[data-dropdown-body]');
        let bodyHeight = targetBody.scrollHeight;


        if (targetParent.classList.contains('_dropdown-show')) {
            targetBody.style = null;
            targetBody.querySelectorAll('[data-dropdown-element]').forEach((i, index) => {
                setTimeout(() => {
                    i.classList.remove('_show');
                }, index * 100);
            });
            targetParent.classList.remove('_dropdown-show');

        } else {

            targetParent.classList.add('_dropdown-show');
            targetBody.style.height = bodyHeight + 'px';
            targetBody.querySelectorAll('[data-dropdown-element]').forEach((i, index) => {
                setTimeout(() => {
                    i.classList.add('_show');
                }, index * 100);
            });
        }

    }
    // dropdown


    if (e.target.classList.contains('modal-field__count--plus') || e.target.closest('.modal-field__count--plus')) {
        e.target.closest('.modal-field__count').querySelector('.modal-field__count--number').innerText = Number(e.target.closest('.modal-field__count').querySelector('.modal-field__count--number').innerText) + 1;
    }

    if (e.target.classList.contains('modal-field__count--minus') || e.target.closest('.modal-field__count--minus')) {
        e.target.closest('.modal-field__count').querySelector('.modal-field__count--number').innerText > 1 ? e.target.closest('.modal-field__count').querySelector('.modal-field__count--number').innerText = Number(e.target.closest('.modal-field__count').querySelector('.modal-field__count--number').innerText) - 1 : 1;
    }



    // List chat
    if (returnElementDeligitaion(e, '.message-page__btn')) {


        if (e.target.closest('.message-page__btn').firstChild.nodeValue.trim() === 'Подробнее') {
            e.target.closest('.message-page__btn').firstChild.nodeValue = 'Свернуть';
            returnElementDeligitaion(e, '.message-page__btn').classList.add('_show');
            heightVariable = find('.reports-all-section').offsetHeight;
            find('.reports-all-section__content').style.height = 'auto';
            find('.reports-all-section').style.height = find('.reports-all-section').scrollHeight + 'px';
            e.target.closest('.message-page').classList.add('_active');
        } else {
            e.target.closest('.message-page__btn').firstChild.nodeValue = 'Подробнее';
            returnElementDeligitaion(e, '.message-page__btn').classList.remove('_show');

            e.target.closest('.message-page').classList.remove('_active');

            setTimeout(() => {
                heightReportsBlock();
                find('.reports-all-section').style.height = heightVariable + 'px';
            }, 0);
        }
    }
    // List chat



});


if (find('[data-empty]') && window.screen.width > SCREEN_TABLET) {
    [...findAll('.your-reports__bottom-element-list-line:not([data-empty])')].filter(i => {
        let elemWidth = i.scrollWidth;
        if (find(`.your-reports__bottom-element-list-line[data-empty][data-info="${i.getAttribute('data-info')}"]`)) {
            find(`.your-reports__bottom-element-list-line[data-empty][data-info="${i.getAttribute('data-info')}"]`).style.width = elemWidth + 'px';
            return;
        }
    });
}

if (find('.reports-all-section__content--indicators')) {
    let arrCountElem = [];
    findAll('.reports-all-section__content--indicators .reports-all-section__content--element').forEach(i => {
        i.scrollWidth !== 0 ? arrCountElem.push(i) : '';
    });
    find('.reports-all-section__content .reports-all-section__content--element-calories').style.gridColumn = `${arrCountElem.length}/1`;
}

if (find('[data-picker]')) {
    let flage = false;
    let dp = new AirDatepicker('[data-picker]', {
        //minDate: new Date(),
        onShow(param) {
            if (find('#birthday')) {
                if (param === true) {
                    flage = true
                } else {
                    flage = false
                }

            }
        },
    });
    if (find('[data-picker]')) {
        window.addEventListener('click', function(e) {
            if (!e.target.closest('.air-datepicker-global-container') &&
                find('.varios-report__top-calendar-icon') &&
                !returnElementDeligitaion(e, '.varios-report__top-calendar-icon') &&
                find('#air-datepicker-global-container').childElementCount > 0) {
                dp.hide();
            }

            if (!e.target.closest('.air-datepicker-global-container') && returnElementDeligitaion(e, '.varios-report__top-calendar-icon')) {
                if (find('#air-datepicker-global-container').childElementCount > 0) {
                    dp.hide();
                } else {
                    dp.show();
                }
            }


            if (!e.target.closest('.air-datepicker-global-container') && e.target.closest('[data-info]') && !e.target.hasAttribute('data-picker') && flage) {
                if (find('#air-datepicker-global-container').childElementCount > 0) {
                    dp.hide();
                } else {
                    dp.show();
                }
            }



            if (!e.target.closest('.air-datepicker-global-container') && flage && !e.target.closest('[data-info]')) {
                if (find('#air-datepicker-global-container').childElementCount > 0) {
                    dp.hide();
                }
            }


            if (returnElementDeligitaion(e, '.varios-report__top-calendar-right')) {
                dp.show();
                dp.next();
            }

            if (returnElementDeligitaion(e, '.varios-report__top-calendar-left')) {
                dp.show();
                dp.prev();
            }



            if (returnElementDeligitaion(e, '.air-datepicker--content') && e.target.classList.contains('-day-')) {
                dp.hide();
            }



            if (returnElementDeligitaion(e, '.air-datepicker--navigation') || e.target.getAttribute('data-info') === 'birthday') {
                if (find('#air-datepicker-global-container').childElementCount > 0 && flage) {
                    dp.show();
                } else {
                    dp.show();
                }
            }

        });
    }
}

[...findAll('.weeks-section__list--element')].filter(el => {
    if (el.getAttribute('data-state-week') !== 'next') {
        el.addEventListener('click', (e) => {
            find('.weeks-section__list--element[data-state-week="current"]').setAttribute('data-state-week', 'last');
            el.setAttribute('data-state-week', 'current');
        });
    }

});




findAll('.list-report-all__element').forEach((i, index) => {
    i.addEventListener('click', () => {
        find('.list-report-all__element._active').classList.remove('_active');
        i.classList.add('_active');
        find('.tab._active').classList.remove('_active');
        findAll('.tab')[index].classList.add('_active');
    });
});


function showValue(val) {
    let rangevalue = find('.field-range__slide--number');
    let slider = find('.field-range__slide--input');

    let pc = val / (slider.max - slider.min);
    let thumbsize = 10;
    let bigval = slider.offsetWidth;
    let tracksize = bigval - thumbsize;
    let shiftWidthThumb = window.innerWidth > 700 ? 55 : 38;
    let shiftMargin = 0;

    if (window.innerWidth < SCREEN_TABLET) {
        if (val === slider.max) {
            shiftMargin = 20
        }
        if (val === slider.min) {
            shiftMargin = -20
        }
    }

    let loc = pc * tracksize;


    rangevalue.innerHTML = val + ' ч';


    rangevalue.style.left = (loc - shiftWidthThumb - shiftMargin) + "px";

}

function setValue(val) {
    find('.field-range__slide--input').value = val;
    showValue(val);
}


if (find('.field-range__slide--input')) {
    document.addEventListener('DOMContentLoaded', function() {
        setValue(find('.field-range__slide--input').value);
        let min = find('.field-range__slide--input').min;
        let max = find('.field-range__slide--input').max;
        find('.field-range__slide--min').innerHTML = min;
        find('.field-range__slide--max').innerHTML = max;
    })

    find('.field-range__slide--input').addEventListener('input', function() {
        setValue(this.value)
    });

    find('.field-range__slide--input').addEventListener('change', function() {
        setValue(this.value)
    });
}




function calculateChatSizes() {
	/*
	Временно отключили после рефакторинга чата за ненадобностью

    if (find('.message-push')) {
        let heightHeader = find('.header').scrollHeight;
        let heightMessage = find('.message-push').scrollHeight;
				let chatHeight = window.innerHeight - heightHeader - heightMessage - 20 - 10;
        find('.message-page').style.height = `${chatHeight}px`;

        let widthElement = find('.section-chat') ? find('.section-chat').offsetWidth : find('.general-menu').offsetWidth;

        find('.message-push').style.width = `calc(100% - ${widthElement}px)`;
    }
		*/
}
calculateChatSizes();


function customHeaderMobile() {
    if (find('[data-custom]')) {
        let linkClone = find('.link-pref-page') ? find('.link-pref-page').cloneNode(true) : false;
        let titleClone = find('.hello').cloneNode(true);
        let lineClone = find('.section-questionnaire--progress').cloneNode(true);
        lineClone.classList.add('progress-fixed-menu');
        find('.section-questionnaire').insertAdjacentHTML('afterbegin', '<div class="header-top-mobile header"></div>');
        find('.link-pref-page') ? find('.header-top-mobile').insertAdjacentHTML('afterbegin', linkClone.outerHTML) : false;
        find('.header-top-mobile').insertAdjacentHTML('afterbegin', titleClone.outerHTML);
        find('.header-top-mobile').insertAdjacentHTML('afterbegin', lineClone.outerHTML);
    }
}


function heightReportsBlock() {
    if (find('.reports-all-section__content') && find('[data-status]')) {
        let heightIndicator = find('.reports-all-section__content--indicators').scrollHeight;
        let heightRecommendations = 0;
        let marginRecommendations = 0
        if (find('.reports-all-section__content--recommendation')) {
            heightRecommendations = find('.reports-all-section__content--recommendation').scrollHeight;
            marginRecommendations = window.getComputedStyle(find('.reports-all-section__content--recommendation')).marginTop;
        }
        find('.reports-all-section__content').style.height = heightIndicator + heightRecommendations + parseInt(marginRecommendations) + 'px';
        find('.reports-all-section').style.height = find('.reports-all-section').offsetHeight + 'px';
    }
}

heightReportsBlock()




const targetElement = document.querySelector('.message-page');

if (document.querySelector('.message-push--field') && window.screen.width < SCREEN_TABLET) {
		// Временно отключил при переделывании чата
		// if (document.querySelector('.message-push--field')) { return };

    document.querySelector('.message-push--field').addEventListener('focus', function(e) {
        e.target.closest('.message-push').classList.add('_active-mess');
        if (document.body.classList.contains('Safari')) {

            document.body.classList.add('keyboard');

            // setTimeout(function() {
            //     window.scrollTo(0, 0);
            // }, 200);

            bodyScrollLock.disableBodyScroll(targetElement);

            // if (window.screen.width < SCREEN_TABLET) find('.message-page').style.height = (find('.message-page').offsetHeight - 275) + 'px';
        }
    });
    document.querySelector('.message-push--field').addEventListener('blur', function(e) {
        e.target.closest('.message-push').classList.remove('_active-mess');
        if (document.body.classList.contains('Safari')) {

            document.body.classList.remove('keyboard');

            bodyScrollLock.clearAllBodyScrollLocks();
            // if (window.screen.width < SCREEN_TABLET) find('.message-page').style.height = (find('.message-page').offsetHeight + 275) + 'px';
        }
    });
}




function defineScrollBar() {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    document.body.setAttribute('style', `--scrollbar-width: ${scrollWidth}px`);
}

defineScrollBar();


// function swapBtnChat() {
//     if (find('.message-page__btn') && window.screen.width < SCREEN_TABLET) {
//         let btnClone = find('.message-page__btn').cloneNode(true);
//         find('.message-push').insertAdjacentHTML('beforebegin', btnClone.outerHTML);
//         find('.message-page__btn').remove();
//     }
// }

// swapBtnChat();


function hideArrowSlider(parentSlider, slide, floatRate) {
    if (find(parentSlider)) {
        let widthParent = find(parentSlider).offsetWidth;
        let widthSlide = find(slide).offsetWidth;
        let countSlide = findAll(slide).length;

				if (!find(parentSlider).parentElement.parentElement.querySelector('[data-arrow')) return;

        if ((widthParent / widthSlide) > countSlide + floatRate) {
            find(parentSlider).parentElement.parentElement.querySelector('[data-arrow]').style.display = 'none';
        } else {
            find(parentSlider).parentElement.parentElement.querySelector('[data-arrow]').style = null;
        }
    }

}

hideArrowSlider('.varios-report__bottom .swiper', '.varios-report__bottom .swiper .swiper-slide', 0.5);
hideArrowSlider('.swiperTasks', '.swiperTasks .swiper-slide', 0.2);
hideArrowSlider('.swiperRecommend', '.swiperRecommend .swiper-slide', 0.8);




let arrRadio = [];
let arrLineRadio = [];
let arrInputCount = [];
let radioLineCount = findAll('.field-radio-line[data-required]').length;
let radioCount = findAll('.field-radio[data-required]').length;
let textInputCount = findAll('.field-box[data-required] input').length;
let textOtherCount = findAll('.field-text[data-required] input[type="text"]').length;
let numberComplete = 100 / (radioLineCount + radioCount + textInputCount + textOtherCount);
if (find('.section-questionnaire__content')) {


    find('.section-questionnaire__content').addEventListener('input', function(e) {
        if (e.target.tagName === 'INPUT') {
            checkedFieldsComplete();
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => checkedFieldsComplete(), 100);
    });

    function checkedFieldsComplete() {
        arrRadio.length = 0;
        arrLineRadio.length = 0;
        arrInputCount.length = 0;

        findAll('.field-radio-line[data-required]').forEach(el => {
            [...el.querySelectorAll('input[type=radio]')].some(elem => {
                if (elem.checked) {
                    arrRadio.push(true);
                }
            });
        });

        findAll('.field-radio[data-required]').forEach(el => {
            [...el.querySelectorAll('input[type=radio]')].some(elem => {
                if (elem.checked) {
                    arrLineRadio.push(true);
                }
            });
        });

        findAll('.field-box[data-required]').forEach(el => {
            [...el.querySelectorAll('input')].map(elem => {
                if (elem.value !== '') {
                    arrInputCount.push(true);
                }
            });
        });

        findAll('.field-text[data-required]').forEach(el => {
            [...el.querySelectorAll('input[type="text"]')].map(elem => {
                if (elem.value !== '') {
                    arrInputCount.push(true);
                }
            });
        });

        let percentNumber = numberComplete * (arrRadio.length + arrLineRadio.length + arrInputCount.length);

        findAll('.section-questionnaire--progress').forEach(el => {
            el.setAttribute('style', `--width-line: ${percentNumber >= 100 ? 100 : percentNumber}%`);
        });
    }

}
