'use strict';

// Гланый моудль
(function () {
  // Функция перехода страницы в активносе состояние
  var enablePage = function (responce) {
    window.data.set(responce);
    window.page.render(window.data.get(), window.photo.create);
    window.filter.employ(window.data.get(), window.page.render, window.photo.create, window.util.makeDebounce);
    window.filter.enable();
  };

  // Передаем модулую фотографий метод отрисовки и метод закрытия по Esc
  window.photo.initiate(window.page.render, window.util.pressEsc);
   // Передаем модулую формы метод закрытия по Esc
   window.form.initiate(window.util.pressEsc);
  // Передаем модулю фильтров метод удаления элементов со страницы
  window.filter.initiate(window.page.clear);

  document.addEventListener('DOMContentLoaded', function () {
    window.backend.download(enablePage);

    window.slider.initiate(function () {
      window.slider.getCoord();
    });
  });
})();
