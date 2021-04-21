class Dropdown {
    constructor() {
        this.handleWrapperClick = this.handleWrapperClick.bind(this);
        this.handleBgClick = this.handleBgClick.bind(this);
        this.wrapper = document.querySelector('[data-wrapper]');
        this.background = document.getElementById('dropdown-background');
        this.headerOuter = document.getElementById('header-outer');
        wrapper.addEventListener('click', this.handleWrapperClick); 
        this.background.addEventListener('click', this.handleBgClick); 
    }

    handleBgClick(e) {
        let target = e.currentTarget;
        target.classList.remove('opened');
        Array.from(document.querySelectorAll('.opened')).forEach(item => {
            item.classList.remove('opened');
        })
        
        document.body.style.overflow = null;
        document.body.style.marginRight = null;
        document.body.classList.remove('pushy-active');
    }

    handleWrapperClick (e) {
        e.preventDefault;
        let link = e.target.closest('[data-link]');
        
        if (link) {
            let item = e.target.closest('[data-item]');
            let dropdown = item.querySelector(' [data-item] > [data-dropdown]');
            dropdown.classList.add('opened');
            this.background.classList.add('opened');
            setTimeout(() => {
                this.headerOuter.classList.add('index');
            }, 500)
            document.body.style.overflow = 'hidden';
            
            if(window.matchMedia("(pointer: coarse)").matches) {
                document.body.style.marginRight = '0';
            } else {
                document.body.style.marginRight = '17px';
            }
        }

        let list = e.target.closest('[data-submenu-list]');
        let item = e.target.closest('[data-submenu-item]');

        if (item) {
            let submenu = item.querySelector('[data-submenu-item] > [data-submenu]');
            let items = list.querySelectorAll('.dropdown__list > .dropdown__item');
            items.forEach(item => {
                item.classList.remove('opened');
            });
            item.classList.add('opened');
        }

        let close = e.target.closest('[data-close]');
        if (close) {
            let wrapper = close.closest('[data-dropdown]');
            this.background.classList.remove('opened');
            wrapper.classList.remove('opened');
            this.headerOuter.classList.remove('index');
            document.body.style.overflow = null;
            document.body.style.marginRight = null;
        }   
    } 
}