'use strict';

// Гланый моудль
(function () {
  // Функция отрисовки фотографий сразу после загрузки страницы
  var enablePage = function (responce) {
    window.page.render(responce, window.photo.create);
  };

  // Передаем модулую фотографий метод отрисовки и метод закрытия по Esc
  window.photo.initiate(window.page.render, window.util.pressEsc);
  window.backend.download(enablePage, window.data.set);
})();
