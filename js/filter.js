'use strict';

// Модуль фильтрации
(function () {
  var filterElement = document.querySelector('.img-filters');

  // Метод активации фильтра
  var enableFilter = function () {
    filterElement.classList.remove('img-filters--inactive');
  };

  window.filter = {
    enable: enableFilter
  };
})();
