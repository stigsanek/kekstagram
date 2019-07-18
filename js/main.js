'use strict';

//Гланый моудль
(function () {
  var error = function () {
    console.log('ошибка');
  }

  window.backend.download(window.photo.render, error);
})();
