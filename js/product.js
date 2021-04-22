import { products } from '../database/products.js';

export default class Product {

    constructor() {
        this.swiperWrapper = document.getElementById('swiper-wrapper');
        this.productName = document.getElementById('product-name');
        this.productModel = document.getElementById('product-model');
        this.productPrice = document.getElementById('product-price');
        this.productFeature = document.getElementById('product-feature');
        this.productExterior = document.getElementById('product-exterior');
        this.productInterior = document.getElementById('product-interior');

        this.productId = window.location.search.split('=')[1];
    
        this.getCurrentProduct();
        this.initSwiper();  
        this.initFeatures(); 
        this.initProductInfo(); 
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

    initProductInfo() {
        this.productName.textContent = this.currentProduct.name;
        this.productModel.textContent = this.currentProduct.model;
        this.productPrice.textContent = this.currentProduct.price;
        this.productExterior.textContent = this.currentProduct.exterior;
        this.productInterior.textContent = this.currentProduct.interior;
    }
}

new Product();