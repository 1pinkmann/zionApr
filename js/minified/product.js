import{products as products}from"../database/products.js";export default class Product{constructor(){this.swiperWrapper=document.getElementById("swiper-wrapper"),this.productLeftColumn=document.getElementById("product-left-column"),this.productName=document.getElementById("product-name"),this.productModel=document.getElementById("product-model"),this.productPrice=document.getElementById("product-price"),this.productFeature=document.getElementById("product-feature"),this.productExterior=document.getElementById("product-exterior"),this.productInterior=document.getElementById("product-interior"),this.book=document.getElementById("book"),this.carModelText=document.getElementById("car-model-text"),this.carModelInput=document.getElementById("car_model"),this.tabsMenu=document.getElementById("tabs-menu"),this.tabsWrapper=document.getElementById("tabs-wrapper"),this.background=document.getElementById("dropdown-background"),this.thumbs=document.getElementById("thumbs"),this.modalWrapper=this.thumbs.querySelector("[data-modal-wrapper]"),this.productId=window.location.search.split("=")[1],this.getCurrentProduct(),this.initSwiper(),this.initFeatures(),this.initProductInfo(),this.initTabsMenu(),this.initTabsItems(),this.handleGlobalClick=this.handleGlobalClick.bind(this),document.addEventListener("click",this.handleGlobalClick)}handleGlobalClick(t){var e=t.target.closest("#product-button"),r=t.target.closest("#product-slider"),t=t.target.closest("[data-close-modal]");e?this.scrollDown(e):r?this.showModal(e):t&&this.handleClose()}scrollDown(t){var e=this.book.getBoundingClientRect().top+document.documentElement.scrollTop;window.scroll({top:e-300,behavior:"smooth"})}getCurrentProduct(){products.forEach(t=>{t.products.forEach(t=>{t.id===Number(this.productId)&&(this.currentProduct=t)})})}renderSwiperSlides(){let e="";return this.currentProduct.images.forEach(t=>{e+=`<li class="swiper-slide">
                    <img src="./images/products/${t}" alt="" class="swiper-slide__image" />
                </li>`}),e}renderFeatures(){let e="";return this.currentProduct.features.forEach(t=>{e+=`<li class="product__feature-item">
                    <div class="product__feature-title">${t.value}</div>
                    <div class="product__feature-name product__info">${t.name}</div>
                </li>`}),e}initFeatures(){this.productFeature.innerHTML=this.renderFeatures()}initSwiper(){this.swiperWrapper.innerHTML=this.renderSwiperSlides();new Swiper("#product-slider",{direction:"horizontal",loop:!0,pagination:{el:"[data-swiper-pagination]"},navigation:{nextEl:'[data-swiper-button="next"]',prevEl:'[data-swiper-button="prev"]'}})}initTabsMenu(){this.tabsMenu.innerHTML=this.renderTabsMenu()}renderTabsMenu(){let r="";return this.currentProduct.specifications.forEach((t,e)=>{r+=`<li class="tabs__menu-item">
                    <button class="tabs__menu-button ${0===e?"active":""}" data-tab-button="${e+1}">${t.name}</button>
                </li>`}),r}initTabsItems(){this.tabsWrapper.innerHTML=this.renderTabsItems()}renderTabsItems(){let r="";return this.currentProduct.specifications.forEach((t,e)=>{r+=`<li class="tabs__item ${0===e?"active":""}" data-tab-item="${e+1}">
                    <ul class="feature">
                        <li class="feature__item">
                            <h1 class="feature__title">STANDARD FEATURES:</h1>
                            <ul class="feature__list">                               
                                ${this.renderSpec(t.standart)}
                            </ul>
                        </li>
                        <li class="feature__item">
                            <h1 class="feature__title">ADDITIONAL FEATURES:</h1>
                            <ul class="feature__list">
                                ${this.renderSpec(t.additional)}
                            </ul>
                        </li>
                    </ul>
                </li>`}),r}renderSpec(t){let e="";return t.forEach(t=>{e+=`<li class="feature__list-item">${t}</li>`}),e}initProductInfo(){this.productName.textContent=this.currentProduct.name,this.productModel.textContent=this.currentProduct.model,this.productPrice.textContent=this.currentProduct.price,this.productExterior.textContent=this.currentProduct.exterior,this.productInterior.textContent=this.currentProduct.interior,this.carModelText.textContent=this.currentProduct.name,this.carModelInput.value=this.currentProduct.name}showModal(){this.thumbs.classList.add("opened"),this.background.classList.add("opened"),this.background.style.zIndex="101",document.body.style.overflow="hidden",window.matchMedia("(pointer: coarse)").matches?document.body.style.marginRight="0":document.body.style.marginRight="17px",this.initThumbs()}initThumbs(){this.swiperModal=document.getElementById("swiper-modal");let t=this.swiperModal.querySelector("[data-swiper-wrapper]");t.innerHTML=this.renderSwiperSlides(),this.swiperGallery=document.getElementById("swiper-gallery");let e=this.swiperGallery.querySelector("[data-swiper-wrapper]");e.innerHTML=this.renderSwiperSlides();var r=new Swiper("#swiper-gallery",{spaceBetween:10,slidesPerView:3,watchSlidesVisibility:!0,watchSlidesProgress:!0,breakpoints:{479:{slidesPerView:6}}});new Swiper("#swiper-modal",{thumbs:{swiper:r}})}renderGallery(t){let e="";return t.forEach(t=>{e+=`<li class="swiper-slide swiper-slide--thumbs">
                <img src="./images/products/${t}" alt="" class="swiper-slide__image" />
            </li>`}),e}handleClose(){this.thumbs.classList.remove("opened"),this.background.classList.remove("opened"),document.body.style.overflow=null,document.body.style.marginRight=null,this.background.style.zIndex=null}}new Product;