!function(u){u(function(){function s(s){s.preventDefault(),e.toggleClass("pushy-active")}var e=u("body"),n=u(".pushy"),o=(u(".pushy-container"),u(".pushy-site-overlay")),t=u(".pushy-menu-btn");n.removeClass("pushy-static").on("click","a.closePushy",s).on("click",".pushy-close-submenu",function(s){u(this).closest(".pushy-open").removeClass("pushy-open")}).on("click","li > a",function(s){var e=u(this),n=e.parent(),o="pushy-open",t=n.hasClass(o);e.nextAll(".pushy-submenu").length&&(s.stopPropagation(),s.preventDefault(),n.toggleClass(o,!t).siblings().removeClass(o))}),t.on("click",s),o.on("click",s)})}(jQuery);