var player = undefined;
$(document).ready(function () {      
            
    function init_template(){//Class is vital to run AJAX Pages 
        
        $('.open-submenu').click(function(){
            $(this).toggleClass('active-item');
            $(this).parent().find('.submenu').removeClass('sub-0');
            var total_submenu_items =  $(this).parent().find('.submenu').children().length;
            $(this).parent().find('.submenu').toggleClass('sub-'+total_submenu_items);        
            return false;
        });
        
        $('.has-submenu').each(function() {
            var count_menus =  $(this).find('.submenu').children().length;
            $(this).find('.menu-number').text(count_menus);
        });
        
        if($('.submenu').hasClass('active-submenu')){
            var total_submenu_items =  $('.active-submenu').children().length;
            $('.active-submenu').toggleClass('sub-'+total_submenu_items);
        }    
                          
        function flip_container_size(){
            var win_width = $(window).width();
            var win_height = $(window).height();
            $('.flip-container, .front, .back').css({
                "width": win_width,
                 "height": win_height        
            });
        }
        flip_container_size();
        $(window).resize(function() {
            flip_container_size();
        });
        
        $('.back').addClass('hide-flip');
        $('.deploy-flip').click(function(){
            //Adding Transitions, Necessary for Resize Purpsoes
            $('.flip-container').addClass('flip-container-transition');
            
            //Add 180 Flip Class
            setTimeout(function(){
                $('.flipper').toggleClass('rotate-180deg');
            },50);  

            //Backflip fix for iOS9 / Android 5
            $('.back').removeClass('hide-flip');
            setTimeout(function(){
                $('.front').addClass('hide-flip');
            },300);
            
            //Preventing Multiple Interactions So Animations Deploy Properly
            $('.close-flip').addClass('no-pointer-events');
            $('.deploy-flip').addClass('no-pointer-events');
            
            //Allows Resize Without Transition
            setTimeout(function(){
                $('.flip-container').removeClass('flip-container-transition');
                $('.close-flip').removeClass('no-pointer-events');
            },400);
            
            //Setting Tap Events & Button Functions
            $('.front').addClass('no-pointer-events');
            $('.front').removeClass('pointer-events');
            $('.back').addClass('pointer-events');
            $('.back').removeClass('no-pointer-events');
            $(this).hide(0);
            $('.close-flip').show(0);
            $('.animated-flip-icon').addClass('rotate-180');            
        });      
        
        
        $('.close-flip').click(function(){
            //Adding Transitions, Necessary for Resize Purpsoes
            $('.flip-container').addClass('flip-container-transition');
            
            //Add 180 Flip Class
            setTimeout(function(){
                $('.flipper').toggleClass('rotate-180deg');
            },50);  
                        
            //Backflip fix for iOS9 / Android 5
            $('.front').removeClass('hide-flip');
            setTimeout(function(){
                $('.back').addClass('hide-flip');
            },300);
            
            //Preventing Multiple Interactions So Animations Deploy Properly
            $('.close-flip').addClass('no-pointer-events');
            $('.deploy-flip').addClass('no-pointer-events');
            
            //Allows Resize Without Transition
            setTimeout(function(){
                $('.flip-container').removeClass('flip-container-transition');
                $('.deploy-flip').removeClass('no-pointer-events');
            },400);
            
            //Setting Tap Events & Button Functions
            $('.front').removeClass('no-pointer-events');
            $('.front').addClass('pointer-events');
            $('.back').removeClass('pointer-events');
            $('.back').addClass('no-pointer-events')
            $(this).hide(0);
            $('.deploy-flip').show(0);
            $('.animated-flip-icon').removeClass('rotate-180');
        });
        
        
        $('tabs a').click(function(){
            preventDefault();
            return false;
        });
        
        
        //FastClick
        $(function() {FastClick.attach(document.body);});

        //Preload Image
        $(function() {
            $(".preload-image").lazyload({
                threshold : 4000,
                effect : "fadeIn",
                container: $("#page-content-scroll")
            });
        });
        
        $('.hide-notification').click(function(){
            $(this).parent().slideUp(); 
            return false;
        });        
        $('.tap-hide').click(function(){
            $(this).slideUp(); 
            return false;
        });
        
        $('.activate-toggle').click(function(){
            $(this).parent().find('.toggle-content').slideToggle(250);
            $(this).parent().find('input').each(function () { this.checked = !this.checked; });
            $(this).parent().find('.toggle-45').toggleClass('rotate-45 color-red-dark');
            $(this).parent().find('.toggle-180').toggleClass('rotate-180 color-red-dark');
            return false;
        });
        
        $('.accordion-item').click(function(){
            $(this).find('.accordion-content').slideToggle(250);
            $(this).find('i').toggleClass('rotate-135 color-red-dark');
            return false;
        });
        
        $('.dropdown-toggle').click(function(){
            $(this).parent().find('.dropdown-content').slideToggle(250); 
            $(this).find('i:last-child').toggleClass('rotate-135');
            return false;
        });
        
        //Portfolio Wide
        
        $('.portfolio-wide-caption a').click(function(){
           $(this).parent().parent().find('.portfolio-wide-content').slideToggle(250);
            return false;
        });
                
        //Detect if iOS WebApp Engaged and permit navigation without deploying Safari
        (function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")

        //Detecting Mobiles//
        var isMobile = {
            Android: function() {return navigator.userAgent.match(/Android/i);},
            BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
            iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
            Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
            Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
            any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
        };

        if( !isMobile.any() ){
            $('.show-blackberry, .show-ios, .show-windows, .show-android').addClass('disabled');
            $('.show-no-detection').removeClass('disabled');
            $('#page-content-scroll').css('right', '0px');
        }
        if(isMobile.Android()) {
            //Status Bar Color for Android
            $('head').append('<meta name="theme-color" content="#000000"> />');
            $('.show-android').removeClass('disabled');
            $('.show-blackberry, .show-ios, .show-windows, .show-download').addClass('disabled');
            $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
            $('.set-today').addClass('mobile-date-correction');
        }
        if(isMobile.BlackBerry()) {
            $('.show-blackberry').removeClass('disabled');
            $('.show-android, .show-ios, .show-windows, .show-download').addClass('disabled');
            $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
        }   
        if(isMobile.iOS()) {
            $('.show-ios').removeClass('disabled');
            $('.show-blackberry, .show-android, .show-windows, .show-download').addClass('disabled');
            $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
            $('.set-today').addClass('mobile-date-correction');
        }
        if(isMobile.Windows()) {
            $('.show-windows').removeClass('disabled');
            $('.show-blackberry, .show-ios, .show-android, .show-download').addClass('disabled');
            $('#page-content-scroll, .sidebar-scroll').css('right', '0px');
        }

        //Galleries
        $(".gallery a, .show-gallery").swipebox();

        //Adaptive Folios
        $('.adaptive-one').click(function(){
            $('.portfolio-switch').removeClass('active-adaptive');
            $(this).addClass('active-adaptive');
            $('.portfolio-adaptive').removeClass('portfolio-adaptive-two portfolio-adaptive-three');
            $('.portfolio-adaptive').addClass('portfolio-adaptive-one');
            return false;
        });    
        $('.adaptive-two').click(function(){
            $('.portfolio-switch').removeClass('active-adaptive');
            $(this).addClass('active-adaptive');
            $('.portfolio-adaptive').removeClass('portfolio-adaptive-one portfolio-adaptive-three');
            $('.portfolio-adaptive').addClass('portfolio-adaptive-two'); 
            return false;
        });    
        $('.adaptive-three').click(function(){
            $('.portfolio-switch').removeClass('active-adaptive');
            $(this).addClass('active-adaptive');
            $('.portfolio-adaptive').removeClass('portfolio-adaptive-two portfolio-adaptive-one');
            $('.portfolio-adaptive').addClass('portfolio-adaptive-three'); 
            return false;
        });

        //Back to top Badge
        $('.back-to-top-badge, .back-to-top').click(function (e) {
            e.preventDefault();
            $('#page-content-scroll').animate({
                scrollTop: 0
            }, 250);
        });     
        
        
        //Share Bottom

        //Bottom Share Fly-up    
        $('body').append('<div class="share-bottom-tap-close"></div>');
        $('.show-share-bottom, .show-share-box').click(function(){
            $('.share-bottom-tap-close').addClass('share-bottom-tap-close-active');
            $('.share-bottom').toggleClass('active-share-bottom'); 
            return false;
        });    
        $('.close-share-bottom, .share-bottom-tap-close').click(function(){
           $('.share-bottom-tap-close').removeClass('share-bottom-tap-close-active');
           $('.share-bottom').removeClass('active-share-bottom'); 
            return false;
        });

        //Set inputs to today's date by adding class set-day
        var set_input_now = new Date();
        var set_input_month = (set_input_now.getMonth() + 1);               
        var set_input_day = set_input_now.getDate();
        if(set_input_month < 10) 
            set_input_month = "0" + set_input_month;
        if(set_input_day < 10) 
            set_input_day = "0" + set_input_day;
        var set_input_today = set_input_now.getFullYear() + '-' + set_input_month + '-' + set_input_day;
        $('.set-today').val(set_input_today);

        //Countdown Timer
        $(function() {$('.countdown-class').countdown({ date: "June 7, 2087 15:03:26"});});

        //Copyright Year 
        if ($("#copyright-year")[0]){document.getElementById('copyright-year').appendChild(document.createTextNode(new Date().getFullYear()))}        
  
        //Contact Form
        var formSubmitted="false";jQuery(document).ready(function(e){function t(t,n){formSubmitted="true";var r=e("#"+t).serialize();e.post(e("#"+t).attr("action"),r,function(n){e("#"+t).hide();e("#formSuccessMessageWrap").fadeIn(500)})}function n(n,r){e(".formValidationError").hide();e(".fieldHasError").removeClass("fieldHasError");e("#"+n+" .requiredField").each(function(i){if(e(this).val()==""||e(this).val()==e(this).attr("data-dummy")){e(this).val(e(this).attr("data-dummy"));e(this).focus();e(this).addClass("fieldHasError");e("#"+e(this).attr("id")+"Error").fadeIn(300);return false}if(e(this).hasClass("requiredEmailField")){var s=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;var o="#"+e(this).attr("id");if(!s.test(e(o).val())){e(o).focus();e(o).addClass("fieldHasError");e(o+"Error2").fadeIn(300);return false}}if(formSubmitted=="false"&&i==e("#"+n+" .requiredField").length-1){t(n,r)}})}e("#formSuccessMessageWrap").hide(0);e(".formValidationError").fadeOut(0);e('input[type="text"], input[type="password"], textarea').focus(function(){if(e(this).val()==e(this).attr("data-dummy")){e(this).val("")}});e("input, textarea").blur(function(){if(e(this).val()==""){e(this).val(e(this).attr("data-dummy"))}});e("#contactSubmitButton").click(function(){n(e(this).attr("data-formId"));return false})})

        // Image Sliders
        var pricing_table = new Swiper('.pricing-table-slider', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 3,
            nextButton: '.pricing-table-next',
            prevButton: '.pricing-table-prev',
            spaceBetween: 50,
            breakpoints: {
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                }
            }
        });
        
        var scrolling_menu = new Swiper('.scrolling-menu', {
            //scrollbar: '.swiper-scrollbar',
            scrollbarHide: true,
            freeMode:true,
            freeModeMomentum:true,
            freeModeMomentumRatio:1,
            slidesPerView: 11,
            spaceBetween: 0,
            grabCursor: true,
            breakpoints: {
                1024: {
                    slidesPerView: 8,
                    spaceBetween: 40
                },
                768: {
                    slidesPerView: 6,
                    spaceBetween: 30
                },
                640: {
                    slidesPerView: 5,
                    spaceBetween: 20
                },
                350:{
                    slidesPerView:4,
                    spaceBetween:10,
                },
                320: {
                    slidesPerView: 3,
                    spaceBetween: 10
                }
            }

        });
        
        if($('.scrolling-menu a').hasClass('active-menu-item')){
            var selectedIndex = $(".active-menu-item").index();
            scrolling_menu.slideTo(selectedIndex, 250);
        }

        
        var swiper = new Swiper('.coverpage-cube', {
            pagination: '.coverpage-slider .swiper-pagination',
            paginationClickable: true,
            loop:true,
            effect: 'cube',
            grabCursor: true,
            cube: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94
            }
        });
        
        var swiper_coverpage = new Swiper('.coverpage-classic', {
            onSlideChangeStart:check_class,
            pagination: '.coverpage-slider .swiper-pagination',
            nextButton:'.flashing-arrows-1',
            prevButton:'.flashing-arrows-2',
            paginationClickable: true
        });
        
        var swiper_homescreen = new Swiper('.coverpage-homescreen', {
            onSlideChangeStart:check_class,
            pagination: '.coverpage-slider .swiper-pagination',
            nextButton:'.flashing-arrows-1',
            prevButton:'.flashing-arrows-2',
            paginationClickable: true
        });
        
        function check_class(){
            if(swiper_homescreen.activeIndex > 0 > swiper_homescreen.isEnd){
                $('.mobileui-home-footer').addClass('show-mobileui-home-footer');
                $('.header-homescreen, .deploy-flip, .animated-flip-icon').addClass('show-mobileui-home-header');
            } else {
                $('.mobileui-home-footer').removeClass('show-mobileui-home-footer');
                $('.header-homescreen, .deploy-flip, .animated-flip-icon').removeClass('show-mobileui-home-header');
            } 

        }
        
        var swiper_category_slider = new Swiper('.category-slider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 5,
        spaceBetween: 20,
        breakpoints: {
            1024: {
                slidesPerView: 6,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 5,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            320: {
                slidesPerView: 3,
                spaceBetween: 5
            }
        }
        });

        var swiper_store_thumbnail_slider = new Swiper('.store-thumbnails', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 5,
            spaceBetween: 20,
            breakpoints: {
                1024: {
                    slidesPerView: 6,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 5,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 5
                },
                320: {
                    slidesPerView: 2,
                    spaceBetween: 5
                }
            }
        });       
        
        var swiper_store_thumbnail_slider = new Swiper('.home-round-slider', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 3,
            spaceBetween: 20,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },                
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                660: {
                    slidesPerView: 1,
                    spaceBetween: 5
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 5
                }
            }
        });
   
        setTimeout(function(){
        var swiper_coverflow_thumbnails = new Swiper('.coverflow-thumbnails', {
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            autoplay:3000,
            autoplayDisableOnInteraction: false,
            spaceBetween:-30,
            loop:true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 35,
                stretch: -50,
                depth: -190,
                modifier:1,
                slideShadows : true
            }
        });      
        },300);
            
        
        var swiper_coverflow_slider = new Swiper('.coverflow-slider', {
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            autoplay:3000,
            autoplayDisableOnInteraction: false,
            loop:true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 60,
                stretch: -60,
                depth: 400,
                modifier: 1,
                slideShadows : false
            }
        });
        
        var swiper_staff_slider = new Swiper('.staff-slider', {
            nextButton: '.next-staff-slider',
            prevButton: '.prev-staff-slider',
            autoplay:5000,
            loop:true,
            autoplayDisableOnInteraction: false,
            slidesPerView: 3,
            spaceBetween: 20,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 5
                }
            }
        });        
        
        var expanding_slider = new Swiper('.expanding-slider', {
            autoplay:3000,
            autoplayDisableOnInteraction: false,
            slidesPerView: 4,
            spaceBetween: 20,
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 5
                },               
                0: {
                    slidesPerView: 1,
                    spaceBetween: 5
                }
            }
        });
        
        var swiper = new Swiper('.home-slider',{autoplay:4000, loop:true});
        var swiper_news_slider = new Swiper('.news-slider',{autoplay:4000, loop:true});
        var swiper_single_item = new Swiper('.single-item',{autoplay:4000, loop:true});
        var swiper_quote_slider = new Swiper('.quote-slider',{autoplay:4000, loop:true});
        var swiper_store_slider = new Swiper('.store-slider', {autoplay:3000, loop:true});
        var swiper_store_slider2 = new Swiper('.store-slider-2', {autoplay:3000, loop:true});
        var swiper_text_slider = new Swiper('.text-slider',{autoplay:2000, loop:true});
        
        //Aligning Elements & Resize Handlers//
        
        function center_content(){
            var screen_width = $(window).width();
            var screen_height = $(window).height();
            var content_width = $('.content-center').outerWidth();
            var content_height = $('.content-center').outerHeight();            
            var content_full_width = $('.page-fullscreen-content').outerWidth();
            var content_full_height = $('.page-fullscreen-content').outerHeight();
            
            var cover_center_height = $('.coverpage-center').outerHeight();
            var cover_center_width = $('.coverpage-center').outerWidth();
            
            $('.content-center').css({
                "left":"50%",
                "top":"50%",
                "margin-left": (content_width/2)*(-1),
                "margin-top": (content_height/2)*(-1)
            });
            
            $('.page-fullscreen').css({
                "width":screen_width,
                "height":screen_height 
            });
                        
            $('.page-fullscreen-content').css({
                "left":"50%",
                "top":"50%",
                "margin-left": (content_full_width/2)*(-1),
                "margin-top": (content_full_height/2)*(-1)
            });                       
            
            $('.coverpage-clear').css({
                "height": screen_height
            });
            
            $('.coverpage-center').css({
                "left":"50%",
                "top":"50%",
                "margin-left": (cover_center_width/2)*(-1),
                "margin-top": (cover_center_height/2)*(-1)
            });       
            
            $('.map-fullscreen iframe').css('width', screen_width);
            $('.map-fullscreen iframe').css('height', screen_height);
                        
        
            var mobileui_home = (screen_height - 100); 

        
            $('.mobileui-home').css('height', mobileui_home);
            $('.mobileui-home-5 a').css('height', mobileui_home/5);
            $('.mobileui-home-4 a').css('height', mobileui_home/4);
            $('.mobileui-home-3 a').css('height', mobileui_home/3);
        };

        center_content();
        $(window).resize(function() {
            center_content(); 
            calculate_lockscreen();
        });
            
        //Fullscreen Map
        $('.map-text, .overlay').click(function(){
            $('.map-text, .map-fullscreen .overlay').addClass('hide-map'); 
            $('.deactivate-map').removeClass('hide-map'); 
            return false;
        });   
        $('.deactivate-map').click(function(){
            $('.map-text, .map-fullscreen .overlay').removeClass('hide-map'); 
            $('.deactivate-map').addClass('hide-map'); 
            return false;
        });
        
        //Classic Toggles
        $('.toggle-title').click(function(){
            $(this).parent().find('.toggle-content').slideToggle(250); 
            $(this).find('i').toggleClass('rotate-toggle');
            return false;
        });
        
        //Checklist Item
        $('.checklist-item').click(function(){
           $(this).find('.ion-ios-circle-outline').toggle(250); 
           $(this).find('strong').toggleClass('completed-checklist');
           $(this).find('.ion-checkmark, .ion-android-close, .ion-ios-checkmark-outline, .ion-checkmark-circled, .ion-close-circled, .ion-ios-close-outline').toggle(250); 
        });
        
        if($('.checklist-item').hasClass('checklist-item-complete')){
           $('.checklist-item-complete').find('.ion-ios-circle-outline').toggle(250); 
           $('.checklist-item-complete').find('strong').toggleClass('completed-checklist');
           $('.checklist-item-complete').find('.ion-checkmark, .ion-android-close, .ion-ios-checkmark-outline, .ion-checkmark-circled, .ion-close-circled, .ion-ios-close-outline').toggle(250); 
        }
        
        //Tasklist Item
        $('.tasklist-incomplete').click(function(){
           $(this).removeClass('tasklist-incomplete'); 
           $(this).addClass('tasklist-completed'); 
            return false;
        });    
        $('.tasklist-item').click(function(){
           $(this).toggleClass('tasklist-completed'); 
            return false;
        });
        
        //Interests
        $('.interest-box').click(function(){
            $(this).toggleClass('transparent-background'); 
            $(this).find('.interest-first-icon, .interest-second-icon').toggleClass('hide-interest-icon');
            return false;
        });
        
        //Loading Thumb Layout for News, 10 articles at a time
        $(function(){
            $(".thumb-layout-page a").slice(0, 5).show(); // select the first ten
            $(".load-more-thumbs").click(function(e){ // click event for load more
                e.preventDefault();
                $(".thumb-layout-page a:hidden").slice(0, 5).show(0); // select next 10 hidden divs and show them
                if($(".thumb-layout-page a:hidden").length == 0){ // check if any hidden divs still exist
                    $(this).hide();
                }
            });
        });

        $(function(){
            $(".card-large-layout-page .card-large-layout").slice(0, 2).show(); // select the first ten
            $(".load-more-large-cards").click(function(e){ // click event for load more
                e.preventDefault();
                $(".card-large-layout-page .card-large-layout:hidden").slice(0, 2).show(0); // select next 10 hidden divs and show them
                if($(".card-large-layout-page div:hidden").length == 0){ // check if any hidden divs still exist
                    $(this).hide();
                }
            });
        });    

        $(function(){
            $(".card-small-layout-page .card-small-layout").slice(0, 3).show(); // select the first ten
            $(".load-more-small-cards").click(function(e){ // click event for load more
                e.preventDefault();
                $(".card-small-layout-page .card-small-layout:hidden").slice(0, 3).show(0); // select next 10 hidden divs and show them
                if($(".card-small-layout-page a:hidden").length == 0){ // check if any hidden divs still exist
                    $(this).hide();
                }
            });
        });

        //News Tabs
        $('.activate-tab-1').click(function(){
            $('#tab-2, #tab-3').slideUp(250); $('#tab-1').slideDown(250);
            $('.home-tabs a').removeClass('active-home-tab');
            $('.activate-tab-1').addClass('active-home-tab');
            return false;
        });    
        $('.activate-tab-2').click(function(){
            $('#tab-1, #tab-3').slideUp(250); $('#tab-2').slideDown(250);
            $('.home-tabs a').removeClass('active-home-tab');
            $('.activate-tab-2').addClass('active-home-tab');
            return false;
        });    
        $('.activate-tab-3').click(function(){
            $('#tab-1, #tab-2').slideUp(250); $('#tab-3').slideDown(250);
            $('.home-tabs a').removeClass('active-home-tab');
            $('.activate-tab-3').addClass('active-home-tab');
            return false;
        });  
        
        //Tabs
    	$('ul.tabs li').click(function(){
            var tab_id = $(this).attr('data-tab');
            
            $(this).parent().parent().find('ul.tabs li').removeClass('current');
            $(this).parent().parent().find('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#"+tab_id).addClass('current');
        })
        
        //Store Cart Add / Substract Numbers
        $(function () {
            $('.add-qty').on('click',function(){
                var $qty=$(this).closest('div').find('.qty');
                var currentVal = parseInt($qty.val());
                if (!isNaN(currentVal)) {
                    $qty.val(currentVal + 1);
                }
                return false;
            });
            $('.substract-qty').on('click',function(){
                var $qty=$(this).closest('div').find('.qty');
                var currentVal = parseInt($qty.val());
                if (!isNaN(currentVal) && currentVal > 0) {
                    $qty.val(currentVal - 1);
                }
                return false;
            });
        });
    
        $('.remove-cart-item').click(function(){
            $(this).parent().parent().slideUp(250); 
            return false;
        });
        
        //Mobile UI Controls//
        
        //Dial Screen
        $('.phone-pad-1').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '1');});
        $('.phone-pad-2').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '2');});
        $('.phone-pad-3').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '3');});
        $('.phone-pad-4').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '4');});
        $('.phone-pad-5').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '5');});
        $('.phone-pad-6').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '6');});
        $('.phone-pad-7').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '7');});
        $('.phone-pad-8').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '8');});
        $('.phone-pad-9').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '9');});
        $('.phone-pad-0').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '0');});
        $('.phone-pad-star').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '*');});
        $('.phone-pad-hash').click(function(){var this_value = $('.mobileui-dialpad input').val(); $('.mobileui-dialpad input').val(this_value + '#');});
        
        $('.call-dial').click(function(){
           $(this).toggleClass('bg-red-dark');
            $(this).find('i').toggleClass('rotate-135');
            $('.mobileui-dialpad-numbers').slideToggle(250);
            $('.mobileui-dialpad-controls').slideToggle(250);
        });
        
        
        //Lockscreen
        new Date($.now());
        var dt = new Date();
        var time = dt.getHours() + ":" + ("0" + dt.getMinutes()).substr(-2);;
        $(".mobileui-lockscreen-header h3").html(time);
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var d = new Date();
        var today_day = d.getDate();
        var today_year = d.getFullYear();
        var dateString = today_day;
        var daysOfWeek = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        var today_weekday = daysOfWeek[new Date(dateString).getDay()];    
        
        $(".mobileui-lockscreen-header p").html(today_weekday + ", " + today_day + "  " + monthNames[d.getMonth()] + "  " + today_year);
        
        function calculate_lockscreen(){
            var lock_height = $('.mobileui-lockscreen-header').height();
            var lock_button = $('.mobileui-lockscreen-home').height();
            var lock_window = $(window).height() -0;
            var lock_total  = lock_window - (lock_button + lock_height);
            $('.mobileui-lockscreen-notifications').css('height', lock_total -160);   
        };
        calculate_lockscreen();
        
        
  
        }//Init Template Function

    
    setTimeout(init_template, 0);//Activating all the plugins
    $(function(){
      'use strict';
      var options = {
        prefetch: false,
        cacheLength: 0,
        blacklist: '.default-link',
        forms: 'contactForm',
        onStart: {
          duration:200, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');

            // Restart your animation
            smoothState.restartCSSAnimations();
            $('.page-preloader').addClass('show-preloader');
            setTimeout(function(){
                $('.flipper').addClass('flipper-double');
                $('.flipper').addClass('rotate-90deg');
            },150);
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');

            // Inject the new content
            $container.html($newContent);
            $('.page-preloader').addClass('show-preloader');
            $('.flipper').addClass('flipper-double');
            $('.flipper').addClass('rotate-90deg');
          }
        },

        onAfter: function($container, $newContent) {
            $('.page-preloader').removeClass('show-preloader');
            setTimeout(init_template, 0)//Timeout required to properly initiate all JS Functions. 
            $('.page-preloader').removeClass('show-preloader');
            $('.flipper').removeClass('rotate-90deg');
            setTimeout(function(){
                $('.flipper').removeClass('flipper-double');
            },150);

            if (player!=undefined){
                player.stop();
                player.release();
            }
            if (typeof(onDeviceReady) === typeof(Function))
            document.addEventListener("deviceready", onDeviceReady, false);

        }
      };
      var smoothState = $('#page-transitions').smoothState(options).data('smoothState');
    });

    if (player!=undefined){
        player.stop();
        player.release();
    }
    if (typeof(onDeviceReady) === typeof(Function))
    document.addEventListener("deviceready", onDeviceReady, false);

});