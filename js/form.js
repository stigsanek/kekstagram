'use strict';

// Модуль формы
(function () {
  var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };

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

  // Обработчики изменения масштаба изображения
  var inputScaleElement = formElement.querySelector('.scale__control--value');
  var smallBtnElement = formElement.querySelector('.scale__control--smaller');
  var bigBtnElement = formElement.querySelector('.scale__control--bigger');

  var countScale = parseInt(inputScaleElement.value, 10);

  var onSmallBtnElementClick = function () {
    if (countScale > Scale.MIN) {
      countScale -= Scale.STEP;
      inputScaleElement.value = countScale + '%';
      previewElement.style = 'transform: scale(' + countScale/Scale.MAX + ');';
    }
  };

  var onBigBtnElementClick = function () {
    if (countScale < Scale.MAX && countScale >= Scale.MIN) {
      countScale += Scale.STEP;
      inputScaleElement.value = countScale + '%';
      previewElement.style = 'transform: scale(' + countScale/Scale.MAX + ');';
    }
  };

  smallBtnElement.addEventListener('click', onSmallBtnElementClick);
  bigBtnElement.addEventListener('click', onBigBtnElementClick);

  window.form = {
    initiate: setFormMethod
  }
})();
