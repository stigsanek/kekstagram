'use strict';

//Гланый моудль
(function () {
  var enablePage = function (responce) {
    window.page.render(responce, window.photo.create);
  }

  window.backend.download(enablePage, window.data.set);
})();
