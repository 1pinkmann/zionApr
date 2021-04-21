(function ($) {
    $(function () {
        var $body = $('body'),
            $pushy = $('.pushy'),
            $container = $('.pushy-container'),
            $siteOverlay = $('.pushy-site-overlay'),
            $menuBtn = $('.pushy-menu-btn'),
            pushyActiveClass = 'pushy-active',
            onClickHandler = function (e) {
                e.preventDefault(); $body.toggleClass(pushyActiveClass);
            }

        $pushy.removeClass('pushy-static')
            .on('click', 'a.closePushy', onClickHandler)
            .on('click', '.pushy-close-submenu', function (e) {
                var $this = $(this); $this.closest('.pushy-open').removeClass('pushy-open');
            })
            .on('click', 'li > a', function (e) {
                var $this = $(this),
                    parent = $this.parent(),
                    openClass = 'pushy-open',
                    isOpen = parent.hasClass(openClass);
                if ($this.nextAll('.pushy-submenu').length) {
                    e.stopPropagation(); e.preventDefault(); parent.toggleClass(openClass, !isOpen).siblings().removeClass(openClass);
                }
            })

        $menuBtn.on('click', onClickHandler); $siteOverlay.on('click', onClickHandler);
    });
})(jQuery);