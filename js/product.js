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