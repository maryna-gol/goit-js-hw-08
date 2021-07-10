import galleryItems from './app.js';

// доступ к эллементам
const ulGalleryEl = document.querySelector('ul.js-gallery');
const modalWindowEl = document.querySelector('div.js-lightbox')
const bigImage = modalWindowEl.querySelector('img.lightbox__image');

// HTML разметкa
const ItemCreateEl = galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>`;
});


ulGalleryEl.insertAdjacentHTML('afterbegin', ItemCreateEl.join(' '));

// слушатели событий
ulGalleryEl.addEventListener('click', onOpenModalWindow);
modalWindowEl.addEventListener('click', onControlClick);
window.addEventListener('keydown', onControlKey);

// открытие модалки
function onOpenModalWindow(e) {
    e.preventDefault(); // отмена перехода по ссылке

    if (e.target.nodeName !== 'IMG') {
        return;
    };

    modalWindowEl.classList.add('is-open');

    bigImage.src = e.target.dataset.source;
    bigImage.alt = e.target.alt;
};

// клики на модальном окнe
function onControlClick(e) {
    if (e.target.dataset.action === 'prev-lightbox') {
        prevImg();
    };

    if (e.target.dataset.action === 'next-lightbox') {
        nextImg();
    };

    if (e.target.dataset.action !== 'close-lightbox' && e.target.nodeName !== 'DIV') {
        return;
    };

    closeModalWindow();
};
// управление стрелками при открытом модальном окнe
function onControlKey(e) {
    if (modalWindowEl.classList.value.includes('is-open')) {
        if (e.keyCode === 27) {
            //console.log('esc');
            closeModalWindow();
        };
        
        if (e.keyCode === 37) {
            //console.log('влево');
            prevImg();
        };

        if (e.keyCode === 39) {
            //console.log('вправо');
            nextImg();
        };
    };    
};

// поиск элемента в списке
function findCurrentElement() {
    let index;

    for (let i = 0; i < ulGalleryEl.children.length; i++) {
        if (ulGalleryEl.children[i].children[0].href === bigImage.src) {
            index = i;
            break;
        }
    }

    return index;
};

// предыдущая картинка на модальном окнe
function prevImg() {
    const index = findCurrentElement();

    if (index === 0) {
        bigImage.src = ulGalleryEl.children[ulGalleryEl.children.length-1].children[0].children[0].dataset.source;
        bigImage.alt = ulGalleryEl.children[ulGalleryEl.children.length-1].children[0].children[0].alt;
    }
    
    else {
        bigImage.src = ulGalleryEl.children[index - 1].children[0].children[0].dataset.source;
        bigImage.alt = ulGalleryEl.children[index - 1].children[0].children[0].alt;
    };
};

// следующая картинка на модальном окнe
function nextImg() {
    const index = findCurrentElement();

    if (index === ulGalleryEl.children.length-1) {
        bigImage.src = ulGalleryEl.children[0].children[0].children[0].dataset.source;
        bigImage.alt = ulGalleryEl.children[0].children[0].children[0].alt;
    }

    else {
        bigImage.src = ulGalleryEl.children[index + 1].children[0].children[0].dataset.source;
        bigImage.alt = ulGalleryEl.children[index + 1].children[0].children[0].alt;
    };
};

// закрытие модального окна
function closeModalWindow() {
    modalWindowEl.classList.remove('is-open');
    bigImage.src = '';
    bigImage.alt = '';
};