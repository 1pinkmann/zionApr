import { products } from '../database/products.js'

export default class ProductsList {

    constructor() {
        this.productsList = document.getElementById('products-tabs');
        this.tabsMenu = document.getElementById('tabs-menu');

        this.initList();
    }

    initList() {
        this.productsList.innerHTML = null;
        this.tabsMenu.innerHTML = null;

        this.productsList.innerHTML += this.renderProductsTabs();
        this.tabsMenu.innerHTML += this.renderTabsMenu();
    }

    renderTabsMenu() {
        let content = '';

        products.forEach((product, i) => {

            content +=
                `<li class="tabs__menu-item">
                    <button class="tabs__menu-button ${(i === 0 ? 'active' : '')}" data-tab-button=${i + 1}>${product.brand}</button>
                </li>`
        });

        return content;
    }

    renderProductsTabs() {
        let content = '';

        products.forEach((product, i) => {

            content +=
                `<li class="tabs__item ${(i === 0 ? 'active' : '')}" data-tab-item="${i + 1}">
                    <ul class="cards-list cards-list--v2">${this.renderProductsList(product.products)}</ul>
                </li>`
        });

        return content;
    }

    renderProductsList(products) {
        let content = '';

        let hostName = window.location.host;

        products.forEach(product => {

            content +=
                `<li class="cards-list__item">
                    <a href="http://${hostName}/product.html?product=${product.id}" class="card card--product-import">
                        <div class="card__image-wrapper">
                            <img src="./images/products/${product.images[0]}" alt="" class="card__image" />
                            <div class="card__badge">
                                <svg class="card__badge-icon" width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                        <path d="M19.0996 13.9216C19.0996 14.2292 18.9719 14.5242 18.7445 14.7417C18.5171 14.9592 18.2087 15.0814 17.8871 15.0814H3.33711C3.01553 15.0814 2.70713 14.9592 2.47974 14.7417C2.25235 14.5242 2.12461 14.2292 2.12461 13.9216V6.96259C2.12461 6.65498 2.25235 6.35997 2.47974 6.14246C2.70713 5.92495 3.01553 5.80275 3.33711 5.80275H4.75816C5.72238 5.80225 6.64695 5.43555 7.32866 4.78325L8.33503 3.82291C8.56177 3.60595 8.86914 3.48376 9.18985 3.48308H12.0319C12.3535 3.48314 12.6618 3.60538 12.8892 3.82291L13.8931 4.78325C14.231 5.10652 14.6321 5.36294 15.0736 5.53787C15.515 5.7128 15.9882 5.80281 16.4661 5.80275H17.8871C18.2087 5.80275 18.5171 5.92495 18.7445 6.14246C18.9719 6.35997 19.0996 6.65498 19.0996 6.96259V13.9216ZM3.33711 4.64291C2.69396 4.64291 2.07715 4.88731 1.62238 5.32233C1.1676 5.75735 0.912109 6.34737 0.912109 6.96259L0.912109 13.9216C0.912109 14.5368 1.1676 15.1268 1.62238 15.5619C2.07715 15.9969 2.69396 16.2413 3.33711 16.2413H17.8871C18.5303 16.2413 19.1471 15.9969 19.6018 15.5619C20.0566 15.1268 20.3121 14.5368 20.3121 13.9216V6.96259C20.3121 6.34737 20.0566 5.75735 19.6018 5.32233C19.1471 4.88731 18.5303 4.64291 17.8871 4.64291H16.4661C15.823 4.64278 15.2063 4.3983 14.7516 3.96325L13.7476 3.00291C13.293 2.56785 12.6763 2.32337 12.0332 2.32324H9.19106C8.54796 2.32337 7.93125 2.56785 7.47658 3.00291L6.47263 3.96325C6.01796 4.3983 5.40126 4.64278 4.75816 4.64291H3.33711Z" fill="white" />
                                        <path d="M10.6129 12.7618C9.80895 12.7618 9.03794 12.4563 8.46947 11.9125C7.901 11.3687 7.58164 10.6312 7.58164 9.86216C7.58164 9.09314 7.901 8.35562 8.46947 7.81184C9.03794 7.26806 9.80895 6.96257 10.6129 6.96257C11.4168 6.96257 12.1878 7.26806 12.7563 7.81184C13.3248 8.35562 13.6441 9.09314 13.6441 9.86216C13.6441 10.6312 13.3248 11.3687 12.7563 11.9125C12.1878 12.4563 11.4168 12.7618 10.6129 12.7618ZM10.6129 13.9216C11.7384 13.9216 12.8178 13.4939 13.6137 12.7326C14.4095 11.9713 14.8566 10.9388 14.8566 9.86216C14.8566 8.78553 14.4095 7.753 13.6137 6.99171C12.8178 6.23042 11.7384 5.80273 10.6129 5.80273C9.48738 5.80273 8.40796 6.23042 7.61211 6.99171C6.81625 7.753 6.36914 8.78553 6.36914 9.86216C6.36914 10.9388 6.81625 11.9713 7.61211 12.7326C8.40796 13.4939 9.48738 13.9216 10.6129 13.9216ZM4.55039 7.54249C4.55039 7.69629 4.48652 7.8438 4.37282 7.95255C4.25913 8.06131 4.10493 8.12241 3.94414 8.12241C3.78335 8.12241 3.62915 8.06131 3.51546 7.95255C3.40176 7.8438 3.33789 7.69629 3.33789 7.54249C3.33789 7.38868 3.40176 7.24118 3.51546 7.13242C3.62915 7.02367 3.78335 6.96257 3.94414 6.96257C4.10493 6.96257 4.25913 7.02367 4.37282 7.13242C4.48652 7.24118 4.55039 7.38868 4.55039 7.54249Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="19.4" height="18.5574" fill="white" transform="translate(0.912109 0.00390625)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span class="card__badge-count">${product.images.length}</span>
                            </div>
                        </div>
                        <div class="card__column">
                            <h2 class="card__title">${product.name}</h2>
                            <h3 class="card__model">${product.model}</h3>
                            <ul class="card__feature">
                                <li class="card__feature-item">${product.features[0].value}</li>
                                <li class="card__feature-item">${product.features[1].value} (KM)</li>
                                <li class="card__feature-item">${product.features[2].value} (CC)</li>
                                <li class="card__feature-item">${product.features[3].value} (OMV)</li>
                            </ul>
                            <div class="card__row">
                                <div class="card__row-inner">
                                    <div class="card__price">${product.price}</div>
                                    <div class="card__info">Inclusive of COE</div>
                                </div>
                                <div class="card__row-inner">
                                    <div class="card__text">${product.exterior}</div>
                                    <div class="card__info">Exterior</div>
                                </div>
                            </div>
                            <div class="card__row card__row--mt">
                                <div class="card__row-inner">
                                    <button class="card__button">VIEW DETAILS</button>
                                </div>
                                <div class="card__row-inner">
                                    <div class="card__text">${product.interior}</div>
                                    <div class="card__info">Interior</div>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>`
        });

        return content;
    }

    renderMenu() {
        let content = '';

        return content;
    }
}

new ProductsList();