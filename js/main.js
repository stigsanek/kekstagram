'use strict';

var COMMENT_AUTOR = ['Арья', 'Дайнерис', 'Серсея', 'Клиган', 'Тирион', 'Джон'];
var COMMENT_MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// Функция генерации объектов
var generateData = function (autorNames, commentMessage) {
  var items = [];
  var getRandom = function (min, max) {
    var random = Math.floor(min + Math.random() * (max - min));
    return random;
  };

  for (var i = 0; i < 25; i++) {
    items[i] = {
      url: '',
      likes: '',
      comments: []
    };

    items[i].url = 'photos/' + (i + 1) + '.jpg';
    items[i].likes = getRandom(15, 200);

    for (var j = 0; j < 3; j++) {
      items[i].comments[j] = {
        avatar: 'img/avatar' + getRandom(1, 6) + '.svg',
        message: commentMessage[Math.floor(Math.random() * commentMessage.length)] + ' ' + commentMessage[Math.floor(Math.random() * commentMessage.length)],
        name: autorNames[Math.floor(Math.random() * autorNames.length)]
      };
    }
  }

  return items;
};

var templatePicure = document.querySelector('#picture').content.querySelector('.picture');

// Функция создания фотографии
var createPhoto = function (object) {
  var newPhoto = templatePicure.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = object.url;
  newPhoto.querySelector('.picture__likes').textContent = object.likes;
  newPhoto.querySelector('.picture__comments').textContent = object.comments.length;

  return newPhoto;
};

var photoList = document.querySelector('.pictures');

// Функция добавления фотографий в разметку
var addPhoto = function (photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var newElementPhoto = createPhoto(photos[i]);
    fragment.appendChild(newElementPhoto);
  }

  photoList.appendChild(fragment);
};

var randomPhotos = generateData(COMMENT_AUTOR, COMMENT_MESSAGE);
addPhoto(randomPhotos);
