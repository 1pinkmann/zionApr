var App=function(){var o=function(e){fbq("track",e)};return{init:function(){var e,t,i;e=$("#hero-slider"),t=$("#middle-slider"),i=$("#mission-mobile-slider"),0<e.length&&e.owlCarousel({loop:!0,margin:0,nav:!1,dots:!0,autoplay:!0,autoplayTimeout:1e4,items:1}),0<i.length&&i.owlCarousel({loop:!0,margin:0,nav:!0,dots:!1,autoplay:!0,autoplayTimeout:1e4,items:1}),0<t.length&&t.owlCarousel({loop:!0,margin:0,nav:!0,dots:!1,autoplay:!0,autoplayTimeout:1e4,items:1,autoHeight:!0,responsive:{1200:{margin:-300,nav:!1,items:3,autoWidth:!0,center:!0},1600:{margin:-200,nav:!1,items:3,autoWidth:!0,center:!0},1920:{margin:-150,nav:!1,items:3,autoWidth:!0,center:!0}}}),$("select").niceSelect(),$(".search-btn").click(function(){$(".wrapper").addClass("active"),$(this).css("display","none"),$(".search-data").fadeIn(500),$(".close-btn").fadeIn(500),$(".search-data .line").addClass("active"),setTimeout(function(){$("input").focus(),$(".search-data label").fadeIn(500),$(".search-data span").fadeIn(500)},800)}),$(".close-btn").click(function(){$(".wrapper").removeClass("active"),$(".search-btn").fadeIn(800),$(".search-data").fadeOut(500),$(".close-btn").fadeOut(500),$(".search-data .line").removeClass("active"),$("input").val(""),$(".search-data label").fadeOut(500),$(".search-data span").fadeOut(500)}),$(".list-dropdown > .caption").on("click",function(){$(this).parent().toggleClass("open")}),$(".list-dropdown > .list > a.nav-link").on("click",function(){$(".list-dropdown > .list > a.nav-link").removeClass("selected"),$(this).addClass("selected").parent().parent().removeClass("open").children(".caption").text($(this).text())}),$(".list-dropdown .tabs__menu-button").on("click",function(e){$(".list-dropdown .caption").text($(this).text());let t=e.target.closest(".tabs");e=t.getBoundingClientRect().top+document.documentElement.scrollTop;window.scrollTo({top:e,behavior:"smooth"})}),$(document).on("keyup",function(e){27===(e.keyCode||e.which)&&$(".list-dropdown").removeClass("open")}),$(document).on("click",function(e){0===$(e.target).closest(".list-dropdown > .caption").length&&$(".list-dropdown").removeClass("open")}),document.querySelectorAll(".button").forEach(e=>e.innerHTML="<div><span>"+e.textContent.trim().split("").join("</span><span>")+"</span></div>"),$(".testimonial-box-row").length&&$(".testimonial-box-row").simpleLoadMore({item:"div.testimonial-box",count:8,counterInBtn:!1,btnText:"View More"}),$("#appointment").validate({errorElement:"span",errorClass:"help-block help-block-error",focusInvalid:!1,ignore:[],rules:{first_name:{required:!0},last_name:{required:!0},phone:{required:!0},enquiry_type:{required:!0},email:{required:!0,email:!0},terms_accepted:{required:!0}},messages:{first_name:{required:"Please enter First Name."},last_name:{required:"Please enter Last Name."},phone:{required:"Please enter Phone Number."},enquiry_type:{required:"Please select Enquiry Type."},email:{required:"Please enter Email Address.",email:"Please enter valid Email Address."},terms_accepted:{required:"Please agree to our privacy policy."}},errorPlacement:function(e,t){t.attr("data-error-container")?e.appendTo("#"+t.attr("data-error-container")):e.insertAfter(t)},highlight:function(e){$(e).closest(".form-group").addClass("has-error")},unhighlight:function(e){$(e).closest(".form-group").removeClass("has-error")},success:function(e){e.closest(".form-group").removeClass("has-error")},submitHandler:function(e){submitButton=$("#button"),submitButton.attr("disabled",!0),submitButton.addClass("loading"),submitButton.removeClass("ready");let t=$("#appointment").serializeArray(),i={};return t.forEach(e=>{i[e.name]=e.value}),fetch("https://formspree.io/f/xwkavlev",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then(e=>{console.log(e),submitButton.addClass("complete"),submitButton.addClass("loading"),o($("#appointment").hasClass("car-details")?"Schedule":"Lead"),setTimeout(()=>{window.initBurst(),setTimeout(()=>{submitButton.attr("disabled",!1),submitButton.removeClass("complete"),submitButton.removeClass("loading"),submitButton.addClass("ready")},4e3)},320),$(".alert-success").removeClass("d-none"),$("#appointment").find("input[type=text], input[type=email], input[type=tel], textarea, select").val("")}),!1}}),$(".pushy-close").click(function(){$("body").removeClass("pushy-active")}),$(".notification-box").fadeIn("slow",function(){$(".notification-box").delay(5e3).fadeOut()}),$(window).width()<994&&$("header").css("width",$(window).width())}}}();$(document).ready(function(){App.init()}),AOS.init();let samt=0;window.addEventListener("scroll",function(){samt<=10?samt++:AOS.refresh()}),$(window).scroll(function(){168<$(this).scrollTop()?$(".header-bottom").addClass("nav-fixed"):$(".header-bottom").removeClass("nav-fixed")}),$(document).ready(function(){var a=$("#wrapper");function o(){$(".notification-box").remove()}function n(){$.getJSON("https://zionauto.sg/notifications",function(e){var t=e;a.append('<div class="notification-box"><div class="notification-img"><img src="" alt=""/></div><div class="notification-title"></div><div class="notification-car-title"></div><div class="notification-box-bottom"><div class="left-side"></div><div class="right-side">Verified by ZION AUTO</div></div></div>');var i=$(".notification-box"),o=i.find(".notification-title"),n=i.find(".notification-img img"),e=i.find(".notification-car-title"),i=i.find(".notification-box-bottom .left-side");n.attr("src",t.icon),o.text(t.name+", has booked an appointment!"),e.text(t.car),i.text(t.elapsedTime+" ago")})}!function e(t=15e3,i=9e3){setTimeout(function(){n(),e(22e3,9e3),setTimeout(function(){o()},i)},t)}(15e3,9e3)});