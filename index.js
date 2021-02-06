'use strict';

const button = document.querySelector('button');
const baseAPIUrl = 'https://swapi.dev/api/';
const genre = 'people';

/* function sendRequest(method, url, body, callback) {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.onload = () => {
    callback(JSON.parse(request.response));
  };
  request.send(body);
} */

const leftDiv = document.querySelector('.result-left');
const rightDiv = document.querySelector('.result-right');
const ul = document.createElement('ul');
leftDiv.appendChild(ul);

button.addEventListener('click', () => {
  const input = document.getElementById('characterId').value;
  if (input === '') {
    return alert('Írd be a karakter nevét');
  }
  const request = new XMLHttpRequest();
  request.open('GET', `${baseAPIUrl}${genre}?search=${input}`);
  request.onload = () => {
    const data = JSON.parse(request.response);
    if (data.count === 0) {
      return alert('Valamit elírtál');
    }
    const characterObject = data.results[0];
    if (ul.hasChildNodes()) {
      ul.removeChild(ul.childNodes[0]);
    }
    if (rightDiv.hasChildNodes()) {
      rightDiv.innerHTML = '';
    }
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.textContent = characterObject.name;
    li.appendChild(a);
    let filmArray = characterObject.films;
    ul.appendChild(li);
    a.addEventListener('click', () => {
      if (rightDiv.hasChildNodes()) {
        rightDiv.innerHTML = '';
      }
      filmArray.forEach((film) => {
        const request = new XMLHttpRequest();
        request.open('GET', film);
        request.onload = () => {
          const data = JSON.parse(request.response);
          const ul = document.createElement('ul');
          const li = document.createElement('li');
          li.textContent = `${data.title} (${data.release_date})`;
          ul.appendChild(li);
          rightDiv.appendChild(ul);
        };
        request.send(null);
      });
    });
  };
  request.send(null);
});
