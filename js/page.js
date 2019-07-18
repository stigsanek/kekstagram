'use strict';

//Модуль страницы
(function () {
  // Метод добавления элементов на страницу
  var photoListElement = document.querySelector('.pictures');

  var pageListElements = [];

  var insertElement = function (data, render) {
    var newNodeElement = null;

    if (Array.isArray(data)) {
      var fragmentElement = document.createDocumentFragment();

      data.forEach(function (element) {
        newNodeElement = render(element);
        fragmentElement.appendChild(newNodeElement);
        pageListElements.push(newNodeElement);
      });
      photoListElement.appendChild(fragmentElement);
    } else {
      newNodeElement = render(data);
      photoListElement.appendChild(newNodeElement);
    }
  };

  //Метод удаления элементов со страницы
  var removeElement = function () {
    pageListElements.forEach(function (item) {
      item.remove();
    });
    pageListElements = [];
  };

  window.page = {
    render: insertElement,
    clear: removeElement
  };
})();
