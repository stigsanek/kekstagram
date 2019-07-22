'use strict';

// Модуль управления слайдером
(function () {
  var SLIDER_SIZE = 20;
  var SLIDER_BORDER = 1;

  var sliderLineElement = document.querySelector('.effect-level__line');
  var sliderElement = sliderLineElement.querySelector('.effect-level__pin');

  // Обработчик перемещения слайдера
  var onSliderElementMove = function (callback) {
    return function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
        };

        startCoords = {
          x: moveEvt.clientX,
        };

        var displacementX = sliderElement.offsetLeft - shift.x;
        if (displacementX >= sliderLineElement.offsetLeft - SLIDER_SIZE && displacementX <= sliderLineElement.offsetLeft + sliderLineElement.offsetWidth - SLIDER_SIZE) {
          sliderElement.style.left = displacementX + 'px';
        }
        callback();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  };

  // Метод выполнения callback при перемещении слайдера
  var onSliderMouseDown = null;
  var performCallback = function (callback) {
    onSliderMouseDown = onSliderElementMove(callback);
    sliderElement.addEventListener('mousedown', onSliderMouseDown);
  };

  // Метод удаления обработчика слайдера
  var removeHandler = function () {
    sliderElement.removeEventListener('mousedown', onSliderMouseDown);
  };

  // Метод определения координат слайдера
  var getCoordinateSlider = function () {
    var sliderCoordinate = sliderElement.getBoundingClientRect();
    var sliderLineCoordinate = sliderLineElement.getBoundingClientRect();
    var coordX = sliderCoordinate.left - sliderLineCoordinate.left + (SLIDER_SIZE / 2 - SLIDER_BORDER);
    return coordX;
  };

  window.slider = {
    enable: performCallback,
    getCoord: getCoordinateSlider,
    remove: removeHandler
  };
})();
