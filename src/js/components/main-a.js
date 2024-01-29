// air datepicker
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
// swiper
import $ from 'jquery';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';

// utils
import { rem } from '../components/main-s';

// --------------------------------------------------------------------------

// remove classes
export const removeClasses = (array, className) => {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
};

// get hash
export const getHash = () => {
  if (location.hash) {
    return location.hash.replace('#', '');
  }
};

// datepicker

export const dp = new AirDatepicker('#dp', {
  multipleDatesSeparator: '-',
  navTitles: {
    days: '<i>MMMM</i> <strong>yyyy</strong>',
  },
  range: true,
  inline: window.innerWidth <= 768 ? true : false,
  // onRenderCell({ date }) {
  //     if (date.getMonth() > dp.viewDate.getMonth()) {
  //       return {
  //         classes: '_hidden',
  //       };
  //     }
  // },
});


$(".all-news").on("click", ".all-news__reset", function(){
  dp.clear();
});

// --------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  // search
  const searchBox = document.querySelector('[data-search-box]');
  if (searchBox) {
    searchBox.addEventListener('input', function () {
      if (searchBox.querySelector('input').value.length) {
        searchBox.classList.add('_search-box-open');
        if (!searchBox.querySelector('input').value.length) {
          searchBox.classList.remove('_search-box-open');
        }
      }
    });
    searchBox.addEventListener('focusout', function () {
      if (searchBox.classList.contains('_search-box-open')) {
        searchBox.classList.remove('_search-box-open');
      }
    });
  }

  


  // sliders
  let chapterPageSlider = null;

  if (document.querySelector('.choose__ticker_l2r')) {
    new Swiper('.choose__ticker_l2r', {
      modules: [Autoplay],
      slidesPerView: 'auto',
      spaceBetween: rem(5),
      loop: true,
      allowTouchMove: false,
      speed: 5500,
      freeMode: true,

      // autoplay
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },

      // breakpoints
      breakpoints: {
        768: {
          spaceBetween: rem(6),
        },
      },
    });
  }
  if (document.querySelector('.choose__ticker_r2l')) {
    new Swiper('.choose__ticker_r2l', {
      modules: [Autoplay],
      slidesPerView: 'auto',
      spaceBetween: rem(5),
      loop: true,
      allowTouchMove: false,
      speed: 5500,
      freeMode: true,

      // autoplay
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
      },

      // breakpoints
      breakpoints: {
        768: {
          spaceBetween: rem(6),
        },
      },
    });
  }
  if (document.querySelector('.shop-card__slider')) {
    new Swiper('.shop-card__slider', {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: rem(3),
      speed: 800,

      // pagination
      pagination: {
        el: '.shop-card__slider-pagination .pagination__bullets',
        clickable: true,
      },
    });
  }
  const slidersInit = () => {
    if (
      (document.querySelector('.chapter-page__slider') &&
        !document.querySelector('.articles-chapter-page')) ||
      (document.querySelector('.articles-chapter-page') &&
        window.innerWidth <= 768 &&
        !chapterPageSlider)
    ) {
      chapterPageSlider = new Swiper('.chapter-page__slider', {
        modules: [Pagination],
        slidesPerView: 1,
        spaceBetween: rem(3),
        speed: 700,

        // pagination
        pagination: {
          el: '.chapter-page__slider-pagination .pagination__bullets',
          clickable: true,
        },
      });
    } else if (
      document.querySelector('.articles-chapter-page') &&
      window.innerWidth > 768 &&
      chapterPageSlider
    ) {
      chapterPageSlider.destroy();
      chapterPageSlider = null;
    }
  };
  slidersInit();

  // video player
  if (document.getElementById('video-js')) {
    videojs('video-js', {
      controls: true,
      autoplay: false,
      preload: 'auto',
    });
  }

  // --------------------------------------------------------------------------

  // handler functions
  const onClickHandler = e => {
    const target = e.target;

    if (target.closest('#play-btn')) {
      document.documentElement.classList.add('_video-modal-opened');
      document.body.classList.add('_lock');
      videojs('video-js').play();
    }
    if (target.closest('#video-modal-close')) {
      document.documentElement.classList.remove('_video-modal-opened');
      document.body.classList.remove('_lock');
      videojs('video-js').pause();
    }
    if (target.closest('[data-clean-form]')) {
      const form = target.closest('form');

      if (form.querySelector('#dp')) {
        dp.clear();
      }
    }
    
    if (target.closest('.filters-btn')) {
      document.documentElement.classList.add('_filters-box-opened');
      document.body.classList.add('_lock');
    }
    if (target.closest('.filters-box__close-btn')) {
      document.documentElement.classList.remove('_filters-box-opened');
      document.body.classList.remove('_lock');
    }

    if (window.innerWidth <= 768) {
      if (target.closest('.filters-box .select__option')) {
        const parent = target.closest('.select');

        removeClasses(parent.querySelectorAll('.select__option'), '_active');
        target.closest('.filters-box .select__option').classList.add('_active');
      }
    }
  };
  const onResizeHandler = () => {
    slidersInit();
  };

  // --------------------------------------------------------------------------

  // document events
  document.addEventListener('click', onClickHandler);
  // window events
  window.addEventListener('resize', onResizeHandler);
});
