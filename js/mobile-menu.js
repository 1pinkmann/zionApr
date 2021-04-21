let mobileButton = document.getElementById('mobile-menu-open');
let mobileMenu = document.getElementById('mobile-menu');
let modileClose = document.getElementById('mobile-close');

mobileButton.addEventListener('click', handleButtonClick);
modileClose.addEventListener('click', handleCloseClick);

function handleButtonClick () {
	mobileMenu.classList.add('dropdown-is-active')
}

function handleCloseClick () {
	mobileMenu.classList.remove('dropdown-is-active')
}