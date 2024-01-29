
const rem = function (rem) {
	if ($(window).width() > 768) {
		return 0.005208335 * $(window).width() * rem;
	} else {
		return (100 / 390) * (0.1 * $(window).width()) * rem;
	}
};

$( document ).ready(function() {
    $(".header__bottom-mob-burger").on('click', function() {
		$(".header__mob").toggleClass("active");
		$(".header__mob-catalog").removeClass("active");
    $("section").toggleClass("active-section");
    $("footer").toggleClass("active-section");
    // $('.header__bottom-form-down').hide();
	});


	$(".header__mob-top-item--catalog").click( function() {
		$(".header__mob-catalog").addClass("active");
	});

  $(".header__mob-top-item--services").click( function() {
		$(".header__mob-services-down").addClass("active");
	});

	$(".header__mob-catalog-back").click( function() {
		$(".header__mob-catalog").removeClass("active");
	});

  $(".header__mob-service-back").click( function() {
		$(".header__mob-services-down").removeClass("active");
	});
  
	
	$(".header__bottom-mob-burger").on('click', function() {
		$(".header__bottom-mob-burger").toggleClass("open");
		// $("main").toggleClass("main-none")
	});



	$( ".catalog-t__box" ).hover( function(){
		$(this).toggleClass('active');
	});

	

	$('.header').each(function () {
        let more = $(this).find('.header__bottom-catalog');
        let hide = $(this).find('.header__menu');
        hide.hide(0);
        more.click(function () {
          hide.fadeToggle(200);
          more.toggleClass('active');
        });
    });


    // $('.header__bottom-form-input').on('input', function() {
    //     $('.header__bottom-form-down').css('display', $(this).val()  !== '' ? 'block' : 'none')
    // });


    $('.header__bottom-form-input')
    .on('keyup', function(e) {
    var input = $(this).val();
    input.length ?
            $('.header__bottom-form-down').fadeIn() :
            $('.header__bottom-form-down').hide();
    });

    $('.header__bottom-mob-search-input')
    .on('keyup', function(e) {
    var input = $(this).val();
    input.length ?
            $('.header__bottom-form-down').fadeIn() :
            $('.header__bottom-form-down').hide();
             $("section").toggleClass("active-section");
             $("footer").toggleClass("active-section");
            
    });



    // $('.p-map__searh-input')
    // .on('keyup', function(e) {
    // var input = $(this).val();
    // input.length ?
    //         $('.p-map__searh-down').addClass('active').fadeIn(200) :
    //         $('.p-map__searh-down').removeClass('active').hide(200);
    // });


  //   $('.header__bottom-mob-burger').on('click', function(){
  //     $('body').toggleClass('active');
      
  // });
   

    $('.header__bottom-catalog').on('click', function(){
        $('body').toggleClass('active');
        $('.header').toggleClass('active');
    });
	

	// $('.header__menu-item').each(function () {
    //     $(this).find('.header__menu-item');
    //     let hide = $(this).find('.header__menu-item-down');
    //     hide.hide(0);
    //     $(this).hover(function () {
    //       hide.fadeToggle(200);
    //       $(this).toggleClass('active');
		  
    //     });
    // });

	$('.header__mob-catalog-inner').each(function () {
		let more = $(this).find('.header__mob-catalog-box');
        let hide = $(this).find('.header__mob-catalog-lists');
        hide.hide(0);
        $(this).click(function () {
          hide.slideToggle(200);
          more.toggleClass('active');
		  
        });
    });


	$('.contacts__bottom-left-item').click(function () {
		var id = $(this).attr('data-tab'),
			content = $('.contacts__bottom-left-content[data-tab="' + id + '"]');
	
		$('.contacts__bottom-left-item.active').removeClass('active'); // 1
		$(this).addClass('active'); // 2
	
		$('.contacts__bottom-left-content.active').removeClass('active'); // 3
		content.addClass('active'); // 4
	});

    $('.catalog__wrap-filters-btn').click(function () {
		var id = $(this).attr('data-tab'),
			content = $('.catalog__wrapper[data-tab="' + id + '"]');
	
		$('.catalog__wrap-filters-btn.active').removeClass('active'); // 1
		$(this).addClass('active'); // 2
	
		$('.catalog__wrapper.active').removeClass('active'); // 3
		content.addClass('active'); // 4
	});

	$('.input-file').each(function() {
        var $input = $(this),
            $label = $input.closest('.js-labelFile'),
            $btn = ('.has-btn'),
            labelVal = $label.html();

        $input.on('change', function(element) {
            var fileName = '';
            if (element.target.value) fileName = element.target.value.split('\\').pop();
            fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
            $('.has-btn').css('display', 'block');
            $input.closest('.js-labelFile').addClass('has-file');

        });



    });

	let btn = document.querySelectorAll(`.has-btn`);

    btn.forEach(el => {
        el.addEventListener(`click`, (evt) => {
            evt.preventDefault();

            const container = el.closest(`div`);
            el.style.display = 'none';
            container.querySelector(`.input-file`).value = '';
            container.querySelector(`.js-labelFile`).classList.remove(`has-file`);
            container.querySelector(`.js-fileName`).textContent = `прикрепить файл`;


        });
    });



    var initBox = false;

function initBoxDown() {
  if (window.innerWidth <= 768) {
    if (!initBox) {
      initBox = true;
      $('.services-p__box').each(function () {
        let more = $(this).find('.services-p__box-inner');
        let hide = $(this).find('.services-p__box-down');
        hide.hide(0);
        more.click(function () {
          hide.slideToggle(300);
          more.toggleClass('active');
        });
      });
    }
  } else if (initBox) {
    
    initBox = false;
  }
}
initBoxDown();
window.addEventListener("resize", initBoxDown);
	
	
});



