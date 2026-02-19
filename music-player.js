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

const allSongs = [
  ...suctionSongs,
  ...loFiSongs,
  ...animeSongs,
  ...jRockSongs,
  ...rockSongsForGayBoys,
  ...kamishinVibeSongs
];
const allCovers = [];

let currentPlaylist = ['Duality', 'Enter Sadman', 'Psychosocial', 'Useewa', 'Gira Gira', 'Somewhere I Belong', 'Faint', 'Lofi Sleep v1',]; // текущий плейлист
let songIndex = 0; // будем отслеживать по нему массив текущего плейлиста
const coverCash = {}; // создаем объект для загрузки кеша обложек
const audioCash = {}; // создаем объект для загрузки кеша аудио

function preLoadCovers(playlist) { // для оптимизации загружек обложек будем помещать их в кеш
  playlist.forEach(song => {
    const index = allSongs.indexOf(song);
    // !coverCash[song] - проверка не существует ли эта песня уже в кеше
    // если песня по индексу и сама обложка уже есть в кеше то пытаться заново грузить ее не будем
    if (index !== -1 && !coverCash[song]) {
      const image = new Image();
      // coverCash обьект с ключом song и значением пути к картинке
      image.onload = () => { coverCash[song] = image.src };
      image.src = `${COVER_BASE}cover${index + 1}.png`;
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
  playSong();
}

function loadSong(song) {
  title.innerHTML = song;
  audio.src = `${AUDIO_BASE}${song}.mp3`;
  let tempIndex = allSongs.indexOf(song);
  if (coverCash[song]) {
    // берем путь из КЕША картинки
    cover.src = coverCash[song];
    // получаем путь картинки песни, ЕСЛИ картинка была успешно загружена
  } else if (tempIndex !== -1) {
    // если же картинка еще не успела прогрузиться И она существует
    // то 
    cover.style.visibility = 'hidden';
    cover.onload = () => {
      cover.style.visibility = 'visible';
      coverCash[song] = cover.src; // сохраняем путь кеша в самой кеш песне
    };
     // кладем путь в КЕШ картинки
    cover.src = `${COVER_BASE}cover${tempIndex + 1}.png`;
  }
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
  audio.play();
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
  playSong();
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