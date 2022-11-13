/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };

  const deleteElement = (elems) => {
    elems.forEach((adv) => adv.remove());
  };

  const sort = (arr) => {
    arr.sort();
  };

  const heroFilm = document.querySelector(".promo__bg");
  heroFilm.querySelector(".promo__genre").textContent = "драма";
  heroFilm.style.backgroundImage = "url('img/bg.jpg')";

  const addMoviesList = function(filmsList, parentElement) {
    parentElement.innerHTML = '';
    sort(filmsList);
    
    filmsList.forEach((film, i) => {
      parentElement.innerHTML += `
          <li class='promo__interactive-item'>${i + 1}. ${film}
            <div class='delete'></div>
          </li>
        `;
    });

    parentElement.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
          btn.closest('li').remove();
          filmsList.splice(i, 1);
          addMoviesList(filmsList, parentElement);
      });
    });
  };
  
  const form = document.querySelector('.add');
  const formInput = form.querySelector('.adding__input');
  const formCheckbox = form.querySelector('input[type="checkbox"]');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let newFilm = formInput.value.trim();

    if(newFilm) {
      if (newFilm.length > 21) {
        newFilm = newFilm.slice(0, 21) + '...';
      }

      if (formCheckbox.checked) {
        console.log('Добавляем любимый фильм');
      }
      
      movieDB.movies.push(newFilm);
      addMoviesList(movieDB.movies, moviesList);
    }

    form.reset();
  });

  const advertisingEls = document.querySelectorAll(".promo__adv img");
  const moviesList = document.querySelector('.promo__interactive-list');

  deleteElement(advertisingEls);
  addMoviesList(movieDB.movies, moviesList);
});
