'use strict';

// Гланый моудль
(function () {
  // Функция перехода страницы в активносе состояние
  var enablePage = function (responce) {
    window.page.render(responce, window.photo.create);
    window.filter.enable();
  };

  // Передаем модулую фотографий метод отрисовки и метод закрытия по Esc
  window.photo.initiate(window.page.render, window.util.pressEsc);

  document.addEventListener('DOMContentLoaded', function () {
    window.backend.download(enablePage, window.data.set);
  });
})();
