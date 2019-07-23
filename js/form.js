'use strict';

// Модуль формы
(function () {
  var FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };
  var WIDTH_LINE_SLIDER = '100%';

  var formElement = document.querySelector('#upload-select-image');
  var formContainerElement = formElement.querySelector('.img-upload__overlay');
  var fileChoserElement = formElement.querySelector('#upload-file');
  var previewElement = formElement.querySelector('.img-upload__preview').querySelector('img');
  var closeFormElement = formElement.querySelector('.img-upload__cancel');
  var commentElement = formElement.querySelector('.text__description');

  // Получение метода закрытия формы по Esc
  var pressEsc = null;
  var removeSlider = null;
  var resetSlider = null;
  var setFormMethod = function (utilMethod, removeMethod, resetMethod) {
    pressEsc = utilMethod;
    removeSlider = removeMethod;
    resetSlider = resetMethod;
  };

  // Обработчики закрытия формы редактирования изображения
  var onCloseFormElementClick = function () {
    formContainerElement.classList.add('hidden');
    closeFormElement.removeEventListener('click', onCloseFormElementClick);
    document.removeEventListener('keydown', onFormElementEscPress);
    disableForm();
  };

  var onFormElementEscPress = function (evt) {
    if (commentElement !== document.activeElement) {
      pressEsc(evt, onCloseFormElementClick);
    }
  };

  // Метод активации формы
  var activateForm = function (callback) {
    var onFormChange = onFileChoserChange(callback);
    fileChoserElement.addEventListener('change', onFormChange);
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

  // Обработчики изменения масштаба изображения
  var inputScaleElement = formElement.querySelector('.scale__control--value');
  var smallBtnElement = formElement.querySelector('.scale__control--smaller');
  var bigBtnElement = formElement.querySelector('.scale__control--bigger');

  var countScale = parseInt(inputScaleElement.value, 10);

  var onSmallBtnElementClick = function () {
    if (countScale > Scale.MIN) {
      countScale -= Scale.STEP;
      inputScaleElement.value = countScale + '%';
      previewElement.style = 'transform: scale(' + countScale / Scale.MAX + ');';
    }
  };

  var onBigBtnElementClick = function () {
    if (countScale < Scale.MAX && countScale >= Scale.MIN) {
      countScale += Scale.STEP;
      inputScaleElement.value = countScale + '%';
      previewElement.style = 'transform: scale(' + countScale / Scale.MAX + ');';
    }
  };

  // Обработчик наложения эффекта на изображение
  var effectsListElement = formElement.querySelector('.img-upload__effects');
  var effectLevelElement = formElement.querySelector('.img-upload__effect-level');
  var currentEffect = null;

  var onEffectsListElementClick = function (evt) {
    resetSlider();
    lineProgressElement.style = 'width: ' + WIDTH_LINE_SLIDER;
    previewElement.removeAttribute('class');
    previewElement.removeAttribute('style');
    previewElement.setAttribute('class', 'effects__preview--' + evt.target.value);
    if (previewElement.classList.contains('effects__preview--none')) {
      effectLevelElement.classList.add('hidden');
    } else {
      effectLevelElement.classList.remove('hidden');
    }
    currentEffect = evt.target.value;
  };

  // Метод применения эффекта при перемещении слайдера
  var inputEffectElement = formElement.querySelector('.effect-level__value');
  var lineProgressElement = formElement.querySelector('.effect-level__depth');

  var changeEffectLevel = function (positionValue) {
    inputEffectElement.value = positionValue;
    lineProgressElement.style = 'width: ' + positionValue + '%';

    var effectValue = null;

    switch (currentEffect) {
      case 'chrome':
        effectValue = positionValue / 100;
        previewElement.style = 'filter: grayscale(' + effectValue + ');';
        break;
      case 'sepia':
        effectValue = positionValue / 100;
        previewElement.style = 'filter: sepia(' + effectValue + ');';
        break;
      case 'marvin':
        effectValue = positionValue;
        previewElement.style = 'filter: invert(' + effectValue + '%);';
        break;
      case 'phobos':
        effectValue = positionValue * 3 / 100;
        previewElement.style = 'filter: blur(' + effectValue + 'px);';
        break;
      case 'heat':
        effectValue = 1 + positionValue * 2 / 100;
        previewElement.style = 'filter: brightness(' + effectValue + ');';
        break;
    }
  };

  // Функция добавления outline
  var addOutline = function () {
    inputHashTagsElement.style = 'outline: 3px solid tomato';
  };

  // Обработчик удаления outline
  var onHashTagsInput = function () {
    inputHashTagsElement.removeAttribute('style');
  };

  // Функция валидации поля хэш-тега
  var checkHashTags = function (data, item) {
    var messageError = '';

    if (data[item] === '') {
      messageError = 'Хеш-теги должны разделяться пробелом. Удалите лишние пробелы.';

    } else if (data[item].charAt(0) !== '#') {
      messageError = 'Хеш-теги должны начинаться с #';

    } else if (data[item].length === 1) {
      messageError = 'Хеш-теги должны состоять минимум из 1 символа, кроме #';

    } else if (data[item].indexOf('#', 1) > 0) {
      messageError = 'Хеш-теги должны разделяться пробелом';

    } else if (data.indexOf(data[item], item + 1) > 0) {
      messageError = 'Хеш-теги не должны повторяться';

    } else if (data[item].length > 20) {
      messageError = 'Максимальная длина хэш-тега не должна превышать 20 символов';
    }

    return messageError;
  };

  // Обработчик валидации поля хэш-тега
  var inputHashTagsElement = formElement.querySelector('.text__hashtags');

  var onHashTagsChange = function () {
    var textValue = inputHashTagsElement.value.trim().split(' ');
    var messageError = '';

    if (textValue.length > 5) {
      addOutline();
      messageError = 'Нельзя указать больше 5 хэш-тегов';

    } else {
      for (var i = 0; i < textValue.length; i++) {
        messageError = checkHashTags(textValue, i);
        if (messageError) {
          addOutline();
          inputHashTagsElement.addEventListener('input', onHashTagsInput);
          break;
        }
      }
    }

    inputHashTagsElement.setCustomValidity(messageError);
  };

  // Функция перевода формы в активное состояние
  var enableForm = function () {
    resetSlider();
    effectLevelElement.classList.add('hidden');
    lineProgressElement.style = 'width: ' + WIDTH_LINE_SLIDER;
    smallBtnElement.addEventListener('click', onSmallBtnElementClick);
    bigBtnElement.addEventListener('click', onBigBtnElementClick);
    effectsListElement.addEventListener('click', onEffectsListElementClick);
    inputHashTagsElement.addEventListener('change', onHashTagsChange);
  };

  // Функция перевода формы в неактивное состояние
  var disableForm = function () {
    smallBtnElement.removeEventListener('click', onSmallBtnElementClick);
    bigBtnElement.removeEventListener('click', onBigBtnElementClick);
    effectsListElement.removeEventListener('click', onEffectsListElementClick);
    inputHashTagsElement.removeEventListener('change', onHashTagsChange);
    inputHashTagsElement.removeEventListener('input', onHashTagsInput);
    removeSlider();
    formElement.reset();
  };

  window.form = {
    activate: activateForm,
    applyEffect: changeEffectLevel,
    enable: enableForm,
    initiate: setFormMethod
  };
})();
