// window.$ = window.jQuery = require('jquery');

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

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