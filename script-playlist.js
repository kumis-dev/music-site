const container = document.querySelector('.container');
const songsContainer = container.querySelector('.songs-container');
const addButton = container.querySelector('.input__btn_action_add');
const resetButton = container.querySelector('.input__btn_action_reset');
const noSongsElement = container.querySelector('.no-songs');
const coverHeading = document.querySelector('.cover__heading');
const form = document.forms.add;
const artist = form.elements.artist;
const title = form.elements.title;
addButton.setAttribute('disabled', true);

const API_URL = 'http://89.232.177.168:8080';

const playListTitles = [
  'Билли Херингтон. Лучшее',
  'Музыка категории swallow suction',
  'Подборка с Gay Party'
];

function renderHasSongs() {
  resetButton.removeAttribute('disabled');
  resetButton.classList.remove('input__btn_disabled');
  noSongsElement.classList.add('no-songs_hidden');
}

function renderNoSongs() {
  resetButton.setAttribute('disabled', true);
  resetButton.classList.add('input__btn_disabled');
  noSongsElement.classList.remove('no-songs_hidden');
}

function addSong(artistValue, titleValue) {
  const songTemplate = document.querySelector('#song-template').content;
  const songElement = songTemplate.querySelector('.song').cloneNode(true);
  const songLike = songElement.querySelector('.song__like'); 
  // ищем внутри скопированного элемента

  songElement.querySelector('.song__artist').textContent = artistValue;
  songElement.querySelector('.song__title').textContent = titleValue;

  // songElement.querySelector('.song__like')

  songsContainer.append(songElement);
}

function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    addButton.removeAttribute('disabled');
    addButton.classList.remove('input__btn_disabled');
  } else {
    addButton.setAttribute('disabled', true);
    addButton.classList.add('input__btn_disabled');
  }
}

function getRandomElement(arr) {
  const randomId = Math.floor(Math.random() * arr.length);
  return arr[randomId];
}



function keyHandler(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    // Добавляем ту же проверку, что и для кнопки
    if (artist.value.length > 0 && title.value.length > 0) {
      addSong(artist.value, title.value);
      renderHasSongs();
      form.reset();
      setSubmitButtonState(false);
    }
    // Если поля не заполнены — ничего не делаем
  }
}

songsContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('song__like')) { 
    evt.target.classList.toggle('song__like_active');
  }
});

form.addEventListener('submit', function (evt) {
  addSong(artist.value, title.value);
  renderHasSongs();

  form.reset();

  evt.preventDefault();
  setSubmitButtonState(false);
});

form.addEventListener('input', () => {
  const isValid = (artist.value.length > 0 && title.value.length > 0) ? true : false;
  setSubmitButtonState(isValid);
});

artist.addEventListener('keydown', keyHandler);
title.addEventListener('keydown', keyHandler);

function doubleClickHandler() {
  coverHeading.textContent = getRandomElement(playListTitles);
  coverHeading.removeEventListener('dblclick', doubleClickHandler);
}
coverHeading.addEventListener('dblclick', doubleClickHandler);

resetButton.addEventListener('click', function () {
  const songs = document.querySelectorAll('.song')

  for (let i = 0; i < songs.length; i++) {
    songs[i].remove();
  }

  renderNoSongs();
});


/* function addSongV2(artistValue, titleValue) {
  let trackContainer = document.createElement('div');
  trackContainer.classList.add('song');

  let artistElement = document.createElement('h4');
  artistElement.classList.add('song__artist');
  artistElement.textContent = artistValue;

  let songElement = document.createElement('h4');
  songElement.classList.add('song__title');
  songElement.textContent = titleValue;

  let likeButtonElement = document.createElement('button');
  likeButtonElement.classList.add('song__like');

  // собираем контейнер элементов в один список
  trackContainer.append(artistElement, songElement, likeButtonElement);
  songsContainer.append(trackContainer);
} */