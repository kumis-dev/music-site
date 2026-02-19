let videoNamesAndPrewiews = [
  {
    text: 'Экономика Хасавюрта в 1 предложении',
    image: 'thumbnails/kabanich.jpg'
  },
  {
    text: 'Раздача пиздюлей от Мистера Биста',
    image: 'thumbnails/12hours_of_slavery.png'
  },
  {
    text: 'Я запихал кучу тротила себе в очко',
    image: 'thumbnails/mem1.jpeg'
  },
  {
    text: 'Очередь в госуслугах за шашлыком',
    image: 'thumbnails/zavod_is_evil.jpg'
  },
  {
    text: 'Чеченский плов на полшестого',
    image: 'thumbnails/shluxa.jpg'
  },
  {
    text: 'Японцы охуели от наших дорог',
    image: 'thumbnails/zub-horror.jpg'
  },
  {
    text: 'Рашн батя даёт пизды пельменям',
    image: 'thumbnails/useful-things.jpg'
  },
  {
    text: 'Узбеки ворвались на сходку гоблинов',
    image: 'thumbnails/spiderman2.jpg'
  },
  {
    text: 'Кавказские бабушки устроили махач',
    image: 'thumbnails/spiderman.jpg'
  },
  {
    text: 'Мистер Бист отправил в рейд на Магнит',
    image: 'thumbnails/bober-kurwa.png'
  },
  {
    text: 'Берем у скуфа на вяленого',
    image: 'thumbnails/full_relax.png'
  },
  {
    text: 'Армяне на шашлыках поймали шизу',
    image: 'thumbnails/dobrota.png'
  },
  {
    text: 'Став стримером, я охуел',
    image: 'thumbnails/strujka.png'
  },
  {
    text: 'Новый айфон 17 вышел с камшотом вместо вспышки',
    image: 'thumbnails/stathem1.jpg'
  },
  {
    text: 'Суши стало морем, шок',
    image: 'thumbnails/stathem2.jpg'
  },
  {
    text: 'Яндекс такси довезло меня до дурки',
    image: 'thumbnails/stathem3.jpg'
  },
  {
    text: 'Налоги? Не, не слышал',
    image: 'thumbnails/stathem4.jpg'
  }
];


function getRandomVideoName(array) {
  let arrIndex = Math.floor(Math.random() * array.length);
  return array[arrIndex].text; // возвращаем текст обьекта внутри массива
}

function getRandomVideoPrewiew(array) {
  let arrIndex = Math.floor(Math.random() * array.length);
  return array[arrIndex].image;
}

let videoTitle = document.querySelectorAll('.video-title');
let videoPrewiew = document.querySelectorAll('.preview-video');
let changeVideos = document.querySelector('.sidebar-link .change-videos');
let changePrewiew = document.querySelector('.sidebar-link .change-preview');

const menuBtn = document.getElementById('menu-toggle');
const sideBar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', () => {
  sideBar.classList.toggle('sidebar--collapsed')
  appWrapper.classList.toggle('sidebar--collapsed');
})

document.getElementById('change-videos-block').addEventListener('click', function () {
  let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  for (let i = 0; i < videoTitle.length; i++) {
    if (i >= videoNamesAndPrewiews.length) {
      console.error('Недостаточно уникальных названий для всех видео!');
      break;
    }
    let index = Math.floor(Math.random() * (videoNamesAndPrewiews.length - i));
    // videoTitle[i].textContent = videoNamesAndPrewiews[indexes[index]].text;
    smoothly(videoTitle[i], 'textContent', videoNamesAndPrewiews[indexes[index]].text);
    console.log('Поставили название: ', videoNamesAndPrewiews[indexes[index]].text);
    // Сдвигаем индексы
    for (let j = index; j < videoNamesAndPrewiews.length - 1; j++) {
      indexes[j] = indexes[j + 1];
    }
  }
});
// smoothly(phrase, 'textContent', randomElement.text);
// smoothly(image, 'src', randomElement.image);

document.getElementById('change-prewiew-block').addEventListener('click', function () {
  let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // Заранее заданные индексы
  for (let i = 0; i < videoPrewiew.length; i++) {
    if (i >= videoNamesAndPrewiews.length) {
      console.error('Недостаточно уникальных превью для всех видео!');
      break;
    }
    let index = Math.floor(Math.random() * (videoNamesAndPrewiews.length - i));
    // videoPrewiew[i].src = videoNamesAndPrewiews[indexes[index]].image;
    smoothly(videoPrewiew[i], 'src', videoNamesAndPrewiews[indexes[index]].image);
    console.log('Поставили превью: ', videoNamesAndPrewiews[indexes[index]].image);
    // Сдвигаем индексы
    for (let j = index; j < videoNamesAndPrewiews.length - 1; j++) {
      indexes[j] = indexes[j + 1];
    }
  }
});



