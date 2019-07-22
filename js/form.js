'use strict';

// Модуль формы
(function () {
  var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];

  var formElement = document.querySelector('#upload-select-image');
  var formContainerElement = formElement.querySelector('.img-upload__overlay');
  var fileChoserElement = formElement.querySelector('#upload-file');
  var previewElement = formElement.querySelector('.img-upload__preview').querySelector('img');
  var closeFormElement = formElement.querySelector('.img-upload__cancel');

  // Получение метода закрытия формы по Esc
  var pressEsc = null;
  var setFormMethod = function (utilMethod) {
    pressEsc = utilMethod;
  };

  // Обработчики закрытия формы редактирования изображения
  var onCloseFormElementClick = function() {
    formContainerElement.classList.add('hidden');
    document.removeEventListener('keydown', onFormElementEscPress);
  };

  var onFormElementEscPress = function (evt) {
    pressEsc(evt, onCloseFormElementClick);
  };

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
      closeFormElement.addEventListener('click', onCloseFormElementClick);
      document.addEventListener('keydown', onFormElementEscPress);
    }
  };

  fileChoserElement.addEventListener('change', onFileChoserChange);

  window.form = {
    initiate: setFormMethod
  }
})();
