class Tabs {
    constructor({wrapperID}) {
        this.tabs = document.getElementById(wrapperID);
        this.wrapper = this.tabs.querySelector('[data-tab-wrapper]');

        this.handleGlobalClick = this.handleGlobalClick.bind(this);
        
        this.tabs.addEventListener('click', this.handleGlobalClick);
    }

    changeTabItem(menuButtonAttribute) {
        let tabItems = this.wrapper.querySelectorAll('[data-tab-item]');

        Array.from(tabItems).forEach(item => {
            if (item.getAttribute('data-tab-item') === menuButtonAttribute) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        })
    }

    handleGlobalClick(e) {
        let menuButton = e.target.closest('[data-tab-button]');

        if (menuButton) {

            let menuButtonAttribute = menuButton.getAttribute('data-tab-button');
            let menuButtons = this.tabs.querySelectorAll('[data-tab-button]');

            Array.from(menuButtons).forEach(button => {
                if (button.getAttribute('data-tab-button') === menuButtonAttribute) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            })

            this.changeTabItem(menuButtonAttribute);
        }
    }
}