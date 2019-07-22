'use strict';

// Модуль формы
(function () {
  var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];

  var formElement = document.querySelector('#upload-select-image');
  var formContainerElement = formElement.querySelector('.img-upload__overlay');
  var fileChoserElement = formElement.querySelector('#upload-file');
  var previewElement = formElement.querySelector('.img-upload__preview').querySelector('img');

  // Обработчик загрузки изображения
  var onFileChoserChange = function () {
    var file = fileChoserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPE.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
      formContainerElement.classList.remove('hidden');
    }
  };

  fileChoserElement.addEventListener('change', onFileChoserChange);
})();
