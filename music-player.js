const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const mixBtn = document.querySelector('.mix');
const repeatBtn = document.querySelector('.repeat');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const cover = document.querySelector('.cover__img');
const imgSrc = document.querySelector('.img__src');
let isShuffle = false; // проверка включена ли кнопка перемешивания плейлиста, по сути тумблер on/off
let isRepeat = false;  // проверка включена ли кнопка повтора плейлиста
let currentPlaylist = ['Duality', 'Enter Sadman', 'Psychosocial', 'Useewa', 'Gira Gira', 'Somewhere I Belong', 'Faint', 'Lofi Sleep v1',]; // текущий плейлист
let songIndex = 0; // будем отслеживать по нему массив текущего плейлиста
const coverCash = {}; // создаем объект для загрузки кеша обложек
const audioCash = {}; // создаем объект для загрузки кеша аудио

function preLoadCovers(playlist) { // для оптимизации загружек обложек будем помещать их в кеш
  playlist.forEach(songTitle => {
    const coverFileName = songTitle
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    if (!coverCash[songTitle]) {
      // coverCash обьект с ключом song и значением пути к картинке
      const image = new Image();
      image.onload = () => { coverCash[songTitle] = image.src };
      image.src = `${COVER_BASE}${coverFileName}.png`;
    }
  });
}

function preLoadAudio(playlist) {
  // предзагружаем текущий и следующие 2 трека 
  for (let i = songIndex; i < songIndex + 3 && i < playlist.length; i++) {
    const song = playlist[i];
    if (!audioCash[song]) { // если песня не загружена
      const preLoadAudio = new Audio(); // то создаем новый аудио элемент 
      preLoadAudio.src = `${AUDIO_BASE}${song}.mp3`;
      preLoadAudio.load();
      audioCash[song] = preLoadAudio;// сохраняем песню чтобы не создавать по кд новую
    }
  }
}

function loadPlaylist(playlist, index) { // функция будет принимать плейлист и индекс песни из текущего загруженного плейлиста
  currentPlaylist = playlist.slice(); // чтобы не работать со ссылкой плейлиста, а напрямую с самим массивом
  songIndex = index || 0;

  preLoadCovers(currentPlaylist); // здесь будет функция по предзагрузке плейлиста
  preLoadAudio(currentPlaylist);

  loadSong(currentPlaylist[songIndex]);
  // Ждём, пока аудио сможет играть
  audio.addEventListener('canplay', () => playSong(), { once: true });
  /* 
    «Слушай это событие только один раз. { once: true }
    Как только событие сработает — сразу удали этот слушатель автоматически.
    Не нужно вручную вызывать removeEventListener
    audio.removeEventListener('canplay', onCanPlay);
  */
}

function loadSong(songTitle) {
  title.innerHTML = songTitle;
  audio.src = `${AUDIO_BASE}${songTitle}.mp3`;
  // классический способ получить slug (безопасное имя для URL или имени файла)
  /* 
    / / - просто пробел
    g — флаг global = заменить все вхождения, а не только первое
    '-' — на что заменяем - на дефис
  */
  /* 
    / ... / - какое либо регулярное выражение
    [^ ... ] - отрицание внутри квадратных скобок
   «любой символ, кроме тех, что перечислены внутри»
    a-z — все маленькие буквы от a до z
    0-9 — все цифры от 0 до 9
    /[^a-z0-9-]/ 
    «любой символ, который не является маленькой буквой, цифрой или дефисом»
    g — флаг global = заменить все вхождения, а не только первое
    '' — на пустую строку (т.е. удалить)
  */
  const coverFileName = songTitle
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
    // /-+/g - символ дефиса (-), + (один или больше подряд)
    // /^-|-$/ = «дефис в самом начале строки или дефис в самом конце строки»
    // ^ — начало строки; $ — конец строк

  if (coverCash[songTitle]) {
    // берем путь из КЕША картинки
    cover.src = coverCash[songTitle];
    // получаем путь картинки песни, ЕСЛИ картинка была успешно загружена
  } else {
    // если же картинка еще не успела прогрузиться И она существует
    // то 
    cover.style.visibility = 'hidden';
    cover.onload = () => {
      cover.style.visibility = 'visible';
      coverCash[songTitle] = cover.src; // сохраняем путь кеша в самой кеш песне
    };
     // кладем путь в КЕШ картинки
    cover.src = `${COVER_BASE}${coverFileName}.png`;
  }

  // Явно запускаем загрузку нового источника
  audio.load();
}

// предзагружаем обложки при старте с самим кешированием
preLoadCovers(currentPlaylist);
preLoadAudio(currentPlaylist);
// затем уже загружаем песню из самого дефолт плейлиста
loadSong(currentPlaylist[songIndex]);

function playSong() {
  player.classList.add('play');
  cover.classList.add('active');
  imgSrc.src = 'icons/pause.png';

  // Ждём, пока браузер сможет играть новый трек
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.catch(error => {
      // Если ошибка — просто логируем, не спамим консоль
      console.warn('Не удалось сразу запустить воспроизведение:', error);
    });
  }
}

function pauseSong() {
  player.classList.remove('play')
  cover.classList.remove('active');
  imgSrc.src = 'icons/play.png';
  audio.pause();
}

function changeSong(choice) {
  if (isShuffle) {
    let newSongIndex;
    do {
      newSongIndex = Math.floor(Math.random() * currentPlaylist.length);
    } while (newSongIndex === songIndex);
    // пока сгенеренный индекс равен текущему мы продолжаем цикл, тем самым исключая повторы
    songIndex = newSongIndex;
  } else {
    if (choice === 'next') {
      songIndex++;
      if (songIndex > currentPlaylist.length - 1) songIndex = 0;
    } else {
      songIndex--;
      if (songIndex < 0) songIndex = currentPlaylist.length - 1;
    }
  }
  loadSong(currentPlaylist[songIndex]);
  preLoadAudio(currentPlaylist);
  // ждём загрузку, потом играем
  audio.addEventListener('canplay', () => playSong(), { once: true });
}

function mixUp() {
  if (isShuffle === false) {
    // переключаем состояние при нажатии кнопки
    isShuffle = true;
    // и дальше пойдет сама логика тумблера
    mixBtn.classList.add('shuffle');
  } else {
    isShuffle = false;
    mixBtn.classList.remove('shuffle');
  }
}

function repeat() {
  if (isRepeat === false) {
    // переключаем состояние при нажатии кнопки
    isRepeat = true;
    // и дальше пойдет сама логика тумблера
    repeatBtn.classList.add('repeat');
  } else {
    isRepeat = false;
    repeatBtn.classList.remove('repeat');
  }
}

// сделай так чтобы при перемешивании песни не повторялись
playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
})

nextBtn.addEventListener('click', () => changeSong('next'));
prevBtn.addEventListener('click', () => changeSong('prev'));
mixBtn.addEventListener('click', mixUp);
repeatBtn.addEventListener('click', repeat);


function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', () => {
  if (isRepeat) {
    audio.currentTime = 0;
    playSong();
  } else {
    changeSong('next');
  }
})

// Обработка пробела для play/pause
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    const isPlaying = player.classList.contains('play');
    if (isPlaying) pauseSong();
    else playSong();
  }
});



// Делаем функции глобальными для доступа из других фреймов
window.loadPlaylist = loadPlaylist;
window.loadSong = loadSong;
window.playSong = playSong;
window.pauseSong = pauseSong;