'use strict';

// Гланый моудль
(function () {
  var enablePage = function (responce) {
    window.page.render(responce, window.photo.create);
  }

  window.photo.initiate(window.page.render);
  window.backend.download(enablePage, window.data.set);
})();
