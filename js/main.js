'use strict';

// Гланый моудль
(function () {
  // Функция перехода страницы в активносе состояние
  var enablePage = function (responce) {
    window.page.render(responce, window.photo.create);
    window.filter.enable();
    window.filter.employ(responce, window.page.render, window.photo.create, window.util.makeDebounce);
  };

  // Передаем модулую фотографий метод отрисовки и метод закрытия по Esc
  window.photo.initiate(window.page.render, window.util.pressEsc);
  // Передаем модулю фильтров метод удаления элементов со страницы
  window.filter.initiate(window.page.clear);

  document.addEventListener('DOMContentLoaded', function () {
    window.backend.download(enablePage, window.data.set);
  });
})();
