'use strict';

// Модуль утилит
(function () {
  var ESC_KEYCODE = 27;

  // Метод выполнения функций по нажатию ESC
  var pressEscKey = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  window.util = {
    pressEsc: pressEscKey
  };
})();
