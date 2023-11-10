// air datepicker
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
// swiper
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
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

  // datepicker
  const dp = new AirDatepicker('#dp', {
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

  // sliders
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
  if (document.querySelector('.chapter-page__slider')) {
    new Swiper('.chapter-page__slider', {
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
  }

  // video player
  if (document.getElementById('video-js')) {
    videojs('video-js', {
      controls: true,
      autoplay: false,
      preload: 'auto',
    });
  }

  // document events
  document.addEventListener('click', function (e) {
    const target = e.target;

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
  });
});
