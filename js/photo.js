'use strict';

//Модуль создания фотографии
(function () {
  var templatePicureElement = document.querySelector('#picture').content.querySelector('.picture');

  // Функция создания фотографии
  var createPhoto = function (data) {
    var newPhoto = templatePicureElement.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = data.url;
    newPhoto.querySelector('.picture__likes').textContent = data.likes;
    newPhoto.querySelector('.picture__comments').textContent = data.comments.length;

    return newPhoto;
  };

  window.photo = {
    create: createPhoto
  };
})();
