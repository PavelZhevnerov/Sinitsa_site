$(function() {	

	/* main-menu */
	var menu = $('.main-nav__list');
	$('#sandwich').on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
		$('#sandwich').toggleClass("active");
	});
	$(window).resize(function(){
		var w = $(window).width();
		if(w > 768 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});

	/* E-mail Ajax Send */
	$('.popup-form').submit(function() {
		var th = $(this);
		afterTxt = $(th).find('.success');
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function() {
			$(afterTxt).addClass("visible");
			setTimeout(function() {
				th.trigger("reset");
				$(afterTxt).removeClass("visible");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});

	/* Определение формы с которой отправили */
	$('a[href="#callback"]').click(function() {
		var dataForm = $(this).data('form'),
			dataText = $(this).data('text');
		$('.form__title').text(dataText);
		$('.popup-form [name=admin-data]').val(dataForm);
	});

	/* Magnific */
	$(".popup-with-move-anim").magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
});

$(window).load(function() { 
	$(".loader-inner").fadeOut(); 
	$(".loader").delay(400).fadeOut("slow"); 
});

/*--------------------------------------------------------------------------*/
/*+*/
$(document).ready(function(){
	$('.w-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		dots: false,
		prevArrow: '<button class="slider__btn slider__btn_prev" type="button"><span class="slider__btn-arrow"></span>Назад</button>',
		nextArrow: '<button class="slider__btn slider__btn_next" type="button"><span class="slider__btn-arrow"></span>Вперед</button>',
		responsive: [
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
});

$(document).ready(function(){
	$('.rw-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		/*autoplaySpeed: 5000,*/
		dots: false,
		prevArrow: '<button class="slider__btn slider__btn_prev" type="button"><span class="slider__btn-arrow"></span>Назад</button>',
		nextArrow: '<button class="slider__btn slider__btn_next" type="button"><span class="slider__btn-arrow"></span>Вперед</button>'
	});
});
