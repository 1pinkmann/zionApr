import { products } from '../database/products.js';

export default class Product {

    constructor() {
        this.swiperWrapper = document.getElementById('swiper-wrapper');
        this.productLeftColumn = document.getElementById('product-left-column');
        this.productName = document.getElementById('product-name');
        this.productModel = document.getElementById('product-model');
        this.productPrice = document.getElementById('product-price');
        this.productFeature = document.getElementById('product-feature');
        this.productExterior = document.getElementById('product-exterior');
        this.productInterior = document.getElementById('product-interior');
        this.book = document.getElementById('book');
        this.carModelText = document.getElementById('car-model-text');
        this.carModelInput = document.getElementById('car_model');
        this.tabsMenu = document.getElementById('tabs-menu');
        this.tabsWrapper = document.getElementById('tabs-wrapper');
        this.background = document.getElementById('dropdown-background');
        this.thumbs = document.getElementById('thumbs');
        this.modalWrapper = this.thumbs.querySelector('[data-modal-wrapper]');
       
        this.productId = window.location.search.split('=')[1];

        this.getCurrentProduct();
        this.initSwiper();
        this.initFeatures();
        this.initProductInfo();
        this.initTabsMenu();
        this.initTabsItems();

        this.handleGlobalClick = this.handleGlobalClick.bind(this);

        document.addEventListener('click', this.handleGlobalClick);
    }

    handleGlobalClick(e) {
        let button = e.target.closest('#product-button');
        let slider = e.target.closest('#product-slider');
        let close = e.target.closest('[data-close-modal]');

        if (button) {
            this.scrollDown(button);
        } else if (slider) {
            this.showModal(button);
        } else if (close) {
            this.handleClose();
        }
    }

    scrollDown(button) {
        let bookPosition = this.book.getBoundingClientRect().top + document.documentElement.scrollTop;

        window.scroll({
            top: bookPosition - 300,
            behavior: 'smooth'
        })
    }

    getCurrentProduct() {
        products.forEach(product => {
            product.products.forEach(item => {

                if (item.id === Number(this.productId)) {
                    this.currentProduct = item;
                }
            })
        });
    }

    renderSwiperSlides() {

        let content = '';

        this.currentProduct.images.forEach(image => {
            content +=
                `<li class="swiper-slide">
                    <img src="./images/products/${image}" alt="" class="swiper-slide__image" />
                </li>`
        });

        return content;
    }

    renderFeatures() {

        let content = '';

        this.currentProduct.features.forEach(feature => {
            content +=
                `<li class="product__feature-item">
                    <div class="product__feature-title">${feature.value}</div>
                    <div class="product__feature-name product__info">${feature.name}</div>
                </li>`
        });

        return content;
    }

    initFeatures() {
        this.productFeature.innerHTML = this.renderFeatures();
    }

    initSwiper() {
        this.swiperWrapper.innerHTML = this.renderSwiperSlides();

        const swiper = new Swiper('#product-slider', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,

            // If we need pagination
            pagination: {
                el: '[data-swiper-pagination]'
            },
            navigation: {
                nextEl: '[data-swiper-button="next"]',
                prevEl: '[data-swiper-button="prev"]',
            },
        });
    }

    initTabsMenu() {
        this.tabsMenu.innerHTML = this.renderTabsMenu();
    }

    renderTabsMenu() {

        let content = '';

        this.currentProduct.specifications.forEach((spec, i) => {
            content +=
                `<li class="tabs__menu-item">
                    <button class="tabs__menu-button ${(i === 0 ? 'active' : '')}" data-tab-button="${i + 1}">${spec.name}</button>
                </li>`
        });

        return content;
    }

    initTabsItems() {
        this.tabsWrapper.innerHTML = this.renderTabsItems();
    }

    renderTabsItems() {

        let content = '';

        this.currentProduct.specifications.forEach((spec, i) => {
            content +=
                `<li class="tabs__item ${(i === 0 ? 'active' : '')}" data-tab-item="${i + 1}">
                    <ul class="feature">
                        <li class="feature__item">
                            <h1 class="feature__title">STANDARD FEATURES:</h1>
                            <ul class="feature__list">                               
                                ${this.renderSpec(spec.standart)}
                            </ul>
                        </li>
                        <li class="feature__item">
                            <h1 class="feature__title">ADDITIONAL FEATURES:</h1>
                            <ul class="feature__list">
                                ${this.renderSpec(spec.additional)}
                            </ul>
                        </li>
                    </ul>
                </li>`
        });

        return content;
    }

    renderSpec(specifications) {
        let content = '';

        specifications.forEach(spec => {
            content +=
                `<li class="feature__list-item">${spec}</li>`
        });

        return content;
    }

    initProductInfo() {
        this.productName.textContent = this.currentProduct.name;
        this.productModel.textContent = this.currentProduct.model;
        this.productPrice.textContent = this.currentProduct.price;
        this.productExterior.textContent = this.currentProduct.exterior;
        this.productInterior.textContent = this.currentProduct.interior;
        this.carModelText.textContent = this.currentProduct.name;
        this.carModelInput.value = this.currentProduct.name;
    }

    showModal() {
        this.thumbs.classList.add('opened');
        this.background.classList.add('opened');
        this.background.style.zIndex = '101';
        document.body.style.overflow = 'hidden';

        if (window.matchMedia("(pointer: coarse)").matches) {
            document.body.style.marginRight = '0';
        } else {
            document.body.style.marginRight = '17px';
        }

        this.initThumbs();
    }

    initThumbs() {
        this.swiperModal = document.getElementById('swiper-modal');
        let swiperModalWrapper = this.swiperModal.querySelector('[data-swiper-wrapper]');
        swiperModalWrapper.innerHTML = this.renderSwiperSlides();

        this.swiperGallery = document.getElementById('swiper-gallery');
        let swiperGalleryWrapper = this.swiperGallery.querySelector('[data-swiper-wrapper]');
        swiperGalleryWrapper.innerHTML = this.renderSwiperSlides();

        let gallery = new Swiper('#swiper-gallery', {
            spaceBetween: 10,
            slidesPerView: 3,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                479: {
                    slidesPerView: 6
                },
            }
        });

        new Swiper('#swiper-modal', {
            thumbs: {
                swiper: gallery
            },
        });
    }

    renderGallery(images) {
        let content = '';

        images.forEach(image => {
            content +=
                `<li class="swiper-slide swiper-slide--thumbs">
                <img src="./images/products/${image}" alt="" class="swiper-slide__image" />
            </li>`
        });

        return content;
    }

    handleClose() {
        this.thumbs.classList.remove('opened');

        this.background.classList.remove('opened');
        document.body.style.overflow = null;
        document.body.style.marginRight = null;
        this.background.style.zIndex = null;
    }
}

new Product();