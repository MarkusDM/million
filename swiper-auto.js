function ajax(){
    $.ajax({
      url: '/ajax/main/main.php',
      type: 'post',
      data: "",
      dataType: 'json',
      success: $.proxy(function (data) {
        window.speedOne = data.SPEED_ONE;
        window.speedTwo = data.SPEED_TWO;
      }, this),
      error: $.proxy(function (error) {
        console.log(error);
      }, this),
    });
  }
  
  $.when(ajax()).done(function(){
    const mainSwiperOne = new Swiper('.main__swiper-one', {
      modules: [Navigation, Pagination, EffectFade, Autoplay],
      slidesPerView: 1,
      wrapperClass: 'main__swiper-wrapper-one',
      slideClass: 'main__one-s',
      speed: 500,
      loop: true,
      autoplay: {
        delay: window.speedOne
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
  
      on: {
        slideChange: function (mainSwiperOne) {
          $('.swiper-pagination-bullet-one').removeClass(
            'swiper-pagination-bullet-one-active'
          );
          $(
            '.swiper-pagination-bullet-one:nth-child(' +
              ((mainSwiperOne.realIndex % 3) + 1) +
              ')'
          ).addClass('swiper-pagination-bullet-one-active');
        },
      },
    })
  
    const mainSwiperTwo = new Swiper('.main__swiper-two', {
      modules: [Navigation, Pagination, EffectFade, Autoplay],
      slidesPerView: 1,
      wrapperClass: 'main__swiper-wrapper-two',
      slideClass: 'main__slide-t',
      speed: 500,
      loop: true,
      autoplay: {
        delay: window.SpeedTwo
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      on: {
        slideChange: function (mainSwiperTwo) {
          $('.swiper-pagination-bullet').removeClass(
            'swiper-pagination-bullet-active'
          );
          $(
            '.swiper-pagination-bullet:nth-child(' +
              ((mainSwiperTwo.realIndex % 3) + 1) +
              ')'
          ).addClass('swiper-pagination-bullet-active');
        },
      },
    });
  })