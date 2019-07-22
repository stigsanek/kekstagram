'use strict';

// Модуль формы
(function () {
  var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };
  var effectsClassListMap = {
    'none': 'effects__preview--none',
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'heat': 'effects__preview--heat'
  };

  var formElement = document.querySelector('#upload-select-image');
  var formContainerElement = formElement.querySelector('.img-upload__overlay');
  var fileChoserElement = formElement.querySelector('#upload-file');
  var previewElement = formElement.querySelector('.img-upload__preview').querySelector('img');
  var closeFormElement = formElement.querySelector('.img-upload__cancel');

  // Получение метода закрытия формы по Esc
  var pressEsc = null;
  var removeSlider = null;
  var setFormMethod = function (utilMethod, sliderMethod) {
    pressEsc = utilMethod;
    removeSlider = sliderMethod;
  };

  // Обработчики закрытия формы редактирования изображения
  var onCloseFormElementClick = function() {
    formContainerElement.classList.add('hidden');
    closeFormElement.removeEventListener('click', onCloseFormElementClick);
    document.removeEventListener('keydown', onFormElementEscPress);
    disableForm();
  };

  var onFormElementEscPress = function (evt) {
    pressEsc(evt, onCloseFormElementClick);
  };

  // Обработчик загрузки изображения
  var onFileChoserChange = function (callback) {
    return function () {
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
        callback();
      }
    };
  };

  // Метод выполнения callback при перемещении слайдера
  var activateForm = function (callback) {
    var onFormChange = onFileChoserChange(callback);
    fileChoserElement.addEventListener('change', onFormChange);
  };

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

  // Обработчик наложения эффекта на изображение
  var effectsListElement = formElement.querySelector('.img-upload__effects');
  var effectLevelElement = formElement.querySelector('.img-upload__effect-level');

  var onEffectsListElementClick = function (evt) {
    previewElement.removeAttribute('class');
    previewElement.setAttribute('class', effectsClassListMap[evt.target.value]);
    if (previewElement.classList.contains('effects__preview--none')) {
      effectLevelElement.classList.add('hidden');
    } else {
      effectLevelElement.classList.remove('hidden');
    }
  };

  // Функция перевода формы в активное состояние
  var enableForm = function () {
    smallBtnElement.addEventListener('click', onSmallBtnElementClick);
    bigBtnElement.addEventListener('click', onBigBtnElementClick);
    effectsListElement.addEventListener('click', onEffectsListElementClick);
  };

  // Функция перевода формы в неактивное состояние
  var disableForm = function () {
    smallBtnElement.removeEventListener('click', onSmallBtnElementClick);
    bigBtnElement.removeEventListener('click', onBigBtnElementClick);
    effectsListElement.removeEventListener('click', onEffectsListElementClick);
    removeSlider();
  };

  window.form = {
    activate: activateForm,
    enable: enableForm,
    initiate: setFormMethod
  }
})();
