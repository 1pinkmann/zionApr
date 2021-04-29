var App = function () {

    var loadSlider = function () {
        var HeroSlider = $("#hero-slider");
        var middleSlider = $("#middle-slider");
        var missionMobileSlider = $("#mission-mobile-slider");

        if (HeroSlider.length > 0) {
            HeroSlider.owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 10000,
                items: 1,
            });
        }

        if (missionMobileSlider.length > 0) {
            missionMobileSlider.owlCarousel({
                loop: true,
                margin: 0,
                nav: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 10000,
                items: 1,
            });
        }


        if (middleSlider.length > 0) {
            middleSlider.owlCarousel({
                loop: true,
                margin: 0,
                nav: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 10000,
                items: 1,
                autoHeight: true,

                responsive: {
                    1200: {
                        margin: -300,
                        nav: false,
                        items: 3,
                        autoWidth: true,
                        center: true,
                    },

                    1600: {
                        margin: -200,
                        nav: false,
                        items: 3,
                        autoWidth: true,
                        center: true,
                    },

                    1920: {
                        margin: -150,
                        nav: false,
                        items: 3,
                        autoWidth: true,
                        center: true,
                    }
                }
            });
        }
    }

    var NiceSelectMenu = function () {
        $('select').niceSelect();
    }

    var FullscreenSearch = function () {
        $(".search-btn").click(function () {
            $(".wrapper").addClass("active");
            $(this).css("display", "none");
            $(".search-data").fadeIn(500);
            $(".close-btn").fadeIn(500);
            $(".search-data .line").addClass("active");
            setTimeout(function () {
                $("input").focus();
                $(".search-data label").fadeIn(500);
                $(".search-data span").fadeIn(500);
            }, 800);
        });

        $(".close-btn").click(function () {
            $(".wrapper").removeClass("active");
            $(".search-btn").fadeIn(800);
            $(".search-data").fadeOut(500);
            $(".close-btn").fadeOut(500);
            $(".search-data .line").removeClass("active");
            $("input").val("");
            $(".search-data label").fadeOut(500);
            $(".search-data span").fadeOut(500);
        });
    }

    var MobileTabSelect = function () {
        $('.list-dropdown > .caption').on('click', function () {
            $(this).parent().toggleClass('open');
        });


        $('.list-dropdown > .list > a.nav-link').on('click', function () {
            $('.list-dropdown > .list > a.nav-link').removeClass('selected');
            $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').text($(this).text());
        });

        $('.list-dropdown .tabs__menu-button').on('click', function () {
            $('.list-dropdown .caption').text($(this).text());
        });

        $(document).on('keyup', function (evt) {
            if ((evt.keyCode || evt.which) === 27) {
                $('.list-dropdown').removeClass('open');
            }
        });


        $(document).on('click', function (evt) {
            if ($(evt.target).closest(".list-dropdown > .caption").length === 0) {
                $('.list-dropdown').removeClass('open');
            }
        });
    }


    var FancyTabHover = function () {
        document.querySelectorAll('.button').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');
    }

    var TestimonialLoading = function () {
        if ($('.testimonial-box-row').length) {
            $('.testimonial-box-row').simpleLoadMore({
                item: 'div.testimonial-box',
                count: 8,
                counterInBtn: false,
                btnText: 'View More',
            });
        }
    }

    var handleValidation = function () {
        var form1 = $('#appointment');
        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: [], // validate all fields including form hidden input

            rules: {
                first_name: {
                    required: true
                },

                last_name: {
                    required: true
                },

                phone: {
                    required: true
                },

                enquiry_type: {

                    required: true

                },

                email: {
                    required: true,
                    email: true
                },

                terms_accepted: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                first_name: {
                    required: "Please enter First Name."
                },

                last_name: {
                    required: "Please enter Last Name."
                },

                phone: {
                    required: "Please enter Phone Number."
                },

                enquiry_type: {
                    required: "Please select Enquiry Type."
                },

                email: {
                    required: "Please enter Email Address.",
                    email: "Please enter valid Email Address.",
                },
                terms_accepted: {
                    required: "Please agree to our privacy policy."
                }
            },

            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.attr("data-error-container")) {
                    error.appendTo('#' + element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            submitHandler: function (form) {
                submitButton = $('#button');
                submitButton.attr('disabled', true);
                submitButton.addClass('loading');
                submitButton.removeClass('ready');

                fetch('https://formspree.io/f/xjvpqdzp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify($('#appointment').serializeArray())
                }).then((response) => {
                    console.log(response);
                    submitButton.addClass("complete");
                    submitButton.addClass("loading");
                    handleFacebookPixels(($('#appointment').hasClass('car-details') ? 'Schedule' : 'Lead'));
                    setTimeout(() => {
                        window.initBurst();
                        setTimeout(() => {
                            // Reset button so user can select it again
                            submitButton.attr('disabled', false);
                            submitButton.removeClass("complete");
                            submitButton.removeClass("loading");
                            submitButton.addClass("ready");
                        }, 4000);
                    }, 320);
                    $('.alert-success').removeClass('d-none');
                    $('#appointment').find("input[type=text], input[type=email], input[type=tel], textarea, select").val("");
                })
                // $.ajax({
                //     url: './ajax.php',
                //     method: 'POST',
                //     data: $('#appointment').serializeArray(),
                //     success: function (data) {
                //         console.log(data);
                //         submitButton.addClass("complete");
                //         submitButton.addClass("loading");
                //         handleFacebookPixels(($('#appointment').hasClass('car-details') ? 'Schedule' : 'Lead'));
                //         setTimeout(() => {
                //             window.initBurst();
                //             setTimeout(() => {
                //                 // Reset button so user can select it again
                //                 submitButton.attr('disabled', false);
                //                 submitButton.removeClass("complete");
                //                 submitButton.removeClass("loading");
                //                 submitButton.addClass("ready");
                //             }, 4000);
                //         }, 320);
                //         $('.alert-success').removeClass('d-none');
                //         $('#appointment').find("input[type=text], input[type=email], input[type=tel], textarea, select").val("");
                //     }
                // });
                return false;
            }
        });
    }

    var handleMenuClose = function () {
        $('.pushy-close').click(function () {
            $('body').removeClass('pushy-active');
        })
    }

    var NotificationPopup = function () {
        $('.notification-box').fadeIn('slow', function () {
            $('.notification-box').delay(5000).fadeOut();
        });
    }

    var handleHeaderWidth = function () {
        if ($(window).width() < 994) {
            $('header').css('width', $(window).width());
        }
    }


    var handleFacebookPixels = function (trackParam) {
        fbq('track', trackParam);
    }


    return {
        init: function () {
            loadSlider();
            NiceSelectMenu();
            FullscreenSearch();
            MobileTabSelect();
            FancyTabHover();
            TestimonialLoading();
            handleValidation();
            handleMenuClose();
            NotificationPopup();
            handleHeaderWidth();
        }
    };
}();

$(document).ready(function () {
    App.init();
});

AOS.init();

let samt = 0;
window.addEventListener('scroll', function () {
    samt <= 10 ? samt++ : AOS.refresh();
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 168) {
        $('.header-bottom').addClass('nav-fixed');
    } else {
        $('.header-bottom').removeClass('nav-fixed');
    }
});

$(document).ready(function () {
    //Our Modal
    var container = $('#wrapper');

    //Creating Modal inner HTML via js
    function createNotif() {
        var notifWrapDiv = '<div class="notification-box"><div class="notification-img"><img src="" alt=""/></div><div class="notification-title"></div><div class="notification-car-title"></div><div class="notification-box-bottom"><div class="left-side"></div><div class="right-side">Verified by ZION AUTO</div></div></div>';

        container.append(notifWrapDiv);
    };
    //

    //Hide notification Modal and destroy notification inner
    function hideNotif() {
        $('.notification-box').remove();
    };
    //

    //Function for showing notification and setting up all the data to HTML
    function showNotif() {

        var jqxhr = $.getJSON("https://zionauto.sg/notifications", function (data) {
            var notifyData = data;

            createNotif();

            var notifBox = $('.notification-box');
            var title = notifBox.find('.notification-title');
            var carImg = notifBox.find('.notification-img img');
            var carName = notifBox.find('.notification-car-title');
            var time = notifBox.find('.notification-box-bottom .left-side');

            //Setting data from json
            carImg.attr('src', notifyData.icon);//object names
            title.text(notifyData.name + ', has booked an appointment!');//object names
            carName.text(notifyData.car);
            time.text(notifyData.elapsedTime + ' ago');//object names
            //
        });


    };
    //

    toggleNotif(15000, 9000);
    //end notification showing

    //Main function for show/hide notification notifications shows up every 15s and stay active for 5s
    function toggleNotif(time = 15000, time2 = 9000) {

        setTimeout(function () {
            showNotif();
            toggleNotif(22000, 9000);

            setTimeout(function () {
                hideNotif();
            }, time2);

        }, time);
    }
    //

});
