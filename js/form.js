'use strict';

// Модуль формы
(function () {
  var formElement = document.querySelector('#upload-select-image');
  var formContainerElement = formElement.querySelector('.img-upload__overlay');
  var uploadFileElement = formElement.querySelector('#upload-file');

  // Обработчик отображения формы редактирования изображения
  var onUploadFileChange = function () {
    formContainerElement.classList.remove('hidden');
  };

  uploadFileElement.addEventListener('change', onUploadFileChange);
})();
