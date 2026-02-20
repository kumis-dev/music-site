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

const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080' 
    : 'http://89.232.177.168:8080';

// асинхронная функция (не ждать ответа)
async function saveSongToServer(artist, title) {
  try {
    // гет запрос (fetch без доп параметров)
    // пост запрос - url и само отправляемое тело
    // подождать ответа от (await) post запроса внутри fetch
    const response = await fetch(API_URL + '/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artist: artist, title: title })
    });
    return await response.json();
  } catch (error) {
    console.error('Ошибка сохранения песни в плейлист: ', error);
  }
}

async function loadSongsFromServer() {
  try {
    const response = await fetch(API_URL + '/songs');
    // ожидаем json через json() -  получаем js объекты
    const songs = await response.json();
    songs.forEach(song => {
      addSong(song.artist, song.title, song.id);
    });
    if (songs.length > 0) renderHasSongs();
  } catch (error) {
    console.error('Ошибка загрузки: ', error);
  }
}

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

function addSong(artistValue, titleValue, id) {
  const songTemplate = document.querySelector('#song-template').content;
  const songElement = songTemplate.querySelector('.song').cloneNode(true);
  const songLike = songElement.querySelector('.song__like'); 
  // ищем внутри скопированного элемента

  songElement.querySelector('.song__artist').textContent = artistValue;
  songElement.querySelector('.song__title').textContent = titleValue;

  // dataset - это специальное свойство DOM элемента для хранения данных
  songElement.dataset.id = id;
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



async function keyHandler(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    // Добавляем ту же проверку, что и для кнопки
    if (artist.value.length > 0 && title.value.length > 0) {
      const savedSong = await saveSongToServer(artist.value, title.value);
      addSong(artist.value, title.value, savedSong.id);
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

form.addEventListener('submit', async function (evt) {
  evt.preventDefault();
  const savedSong = await saveSongToServer(artist.value, title.value);
  addSong(artist.value, title.value, savedSong.id);
  renderHasSongs();
  form.reset();
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

resetButton.addEventListener('click', async function () {
  console.log("RESET CLICKED");
  const songs = document.querySelectorAll('.song')

  for (let i = 0; i < songs.length; i++) {
    const id = songs[i].dataset.id;
    if (id) {
      console.log("ID:", id);
      await fetch(API_URL + '/songs/' + id, {
        method: 'DELETE'
      });
    }
    songs[i].remove();
  }

  renderNoSongs();
});

loadSongsFromServer();