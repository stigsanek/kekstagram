'use strict';

// Модуль создания фотографии
(function () {
  // Получение метода для отрисовки большого фото на странице и закрытия фото по Esc
  var insertBigPhoto = null;
  var pressEsc = null;
  var setPhotoMethod = function (insertMethod, utilMethod) {
    insertBigPhoto = insertMethod;
    pressEsc = utilMethod;
  };

  // Метод создания фотографии
  var templatePicureElement = document.querySelector('#picture').content.querySelector('.picture');
  var bodyElement = document.querySelector('body');

  var createPhoto = function (data) {
    var newPhoto = templatePicureElement.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = data.url;
    newPhoto.querySelector('.picture__likes').textContent = data.likes;
    newPhoto.querySelector('.picture__comments').textContent = data.comments.length;

    // Обработчик клика
    var onPhotoClick = function () {
      pictureElement.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
      insertBigPhoto(data, createBigPhoto);
      newPhoto.removeEventListener('click', onPhotoClick);
    };

    newPhoto.addEventListener('click', onPhotoClick);

    return newPhoto;
  };

  // Функция создания полноэкранной фотографии
  var pictureElement = document.querySelector('.big-picture');
  var phototElement = pictureElement.querySelector('.big-picture__img').querySelector('img');
  var textElement = pictureElement.querySelector('.social__caption');
  var likeElement = pictureElement.querySelector('.likes-count');
  var commentElement = pictureElement.querySelector('.comments-count');
  var closeElement = pictureElement.querySelector('.big-picture__cancel');

  var createBigPhoto = function (data) {
    phototElement.src = data.url;
    textElement.textContent = data.description;
    likeElement.textContent = data.likes;
    commentElement.textContent = data.comments.length;

    document.addEventListener('keydown', onBigPhotoEscPress);
    closeElement.addEventListener('click', function () {
      closeBigPhoto();
    });
  };

  // Функции закрытия полноэкранной фотографии
  var closeBigPhoto = function () {
    pictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  var onBigPhotoEscPress = function (evt) {
    pressEsc(evt, closeBigPhoto);
  };

  window.photo = {
    create: createPhoto,
    initiate: setPhotoMethod
  };
})();
