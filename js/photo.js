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

  var photoListElement = document.querySelector('.pictures');

  // Метод добавления фотографий в разметку
  var renderPhoto = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (element) {
      var newPhotoElement = createPhoto(element);
      fragment.appendChild(newPhotoElement);
    });

    photoListElement.appendChild(fragment);
  };

  window.photo = {
    render: renderPhoto
  };
})();
