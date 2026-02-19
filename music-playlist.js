const trackElements = document.querySelectorAll('.playlist-track-title');

const suctionPlaylist = document.querySelector('.suction-playlist');
const suctionCover = document.querySelector('.suction-playlist .cover-playlist'); // обложка для открытия/скрытия треков
const suctionHide = document.querySelector('.suction-playlist .hidden');
const suctionName = document.querySelector('.suction-playlist .playlist-name');
const suctionSelector = '.suction-playlist .playlist-track-title';

const lofiPlaylist = document.querySelector('.lofi-playlist');
const lofiCover = document.querySelector('.lofi-playlist .cover-playlist');
const lofiHide = document.querySelector('.lofi-playlist .hidden');
const lofiName = document.querySelector('.lofi-playlist .playlist-name');
const lofiSelector = '.lofi-playlist .playlist-track-title';

const animePlaylist = document.querySelector('.anime-playlist');
const animeCover = document.querySelector('.anime-playlist .cover-playlist');
const animeHide = document.querySelector('.anime-playlist .hidden');
const animeName = document.querySelector('.anime-playlist .playlist-name');
const animeSelector = '.anime-playlist .playlist-track-title';

const jRockPlaylist = document.querySelector('.jrock-playlist');
const jRockCover = document.querySelector('.jrock-playlist .cover-playlist');
const jRockHide = document.querySelector('.jrock-playlist .hidden');
const jRockName = document.querySelector('.jrock-playlist .playlist-name');
const jRockSelector = '.jrock-playlist .playlist-track-title';

const rockGayBoysPlaylist = document.querySelector('.rock-gay-boys-playlist');
const rockGayBoysCover = document.querySelector('.rock-gay-boys-playlist .cover-playlist');
const rockGayBoysHide = document.querySelector('.rock-gay-boys-playlist .hidden');
const rockGayBoysName = document.querySelector('.rock-gay-boys-playlist .playlist-name');
const rockGayBoysSelector = '.rock-gay-boys-playlist .playlist-track-title';

const kamishinVibePlaylist = document.querySelector('.kamishin-vibe-playlist');
const kamishinVibeCover = document.querySelector('.kamishin-vibe-playlist .cover-playlist');
const kamishinVibeHide = document.querySelector('.kamishin-vibe-playlist .hidden');
const kamishinVibeName = document.querySelector('.kamishin-vibe-playlist .playlist-name');
const kamishinVibeSelector = '.kamishin-vibe-playlist .playlist-track-title';

function playChoicePlaylist(selector, namePlaylist) {
    document.querySelectorAll(selector).forEach((element, index) => {
        element.addEventListener('click', () => {
            const playerFrame = window.parent.document.getElementById('playerFrame');
            if (playerFrame) {
                const playerWindow = playerFrame.contentWindow;
                playerWindow.loadPlaylist(namePlaylist, index);
            }
        });
    });
}

// currentPlaylist - наш плейлист, его скрывать не надо
function openHidePlaylist(coverPlaylist, listPlaylist, namePlaylist, currentPlaylist) {
    coverPlaylist.addEventListener('click', () => {
        // переключаем видимость треков плейлиста
        listPlaylist.classList.toggle('hidden');
        namePlaylist.classList.toggle('hidden');
        
        // теперь нужно реализовать так, чтобы и другие плейлисты смогли бы скрыться
        document.querySelectorAll('.playlists-cards > div').forEach(playlist => {
            if (playlist !== currentPlaylist) {
                playlist.classList.toggle('hidden');
            }
        });
    });
}

// Инициализация
playChoicePlaylist(suctionSelector, suctionSongs);
playChoicePlaylist(lofiSelector, loFiSongs);
playChoicePlaylist(animeSelector, animeSongs);
playChoicePlaylist(rockGayBoysSelector, rockSongsForGayBoys);
playChoicePlaylist(jRockSelector, jRockSongs);
playChoicePlaylist(kamishinVibeSelector, kamishinVibeSongs);

openHidePlaylist(suctionCover, suctionHide, suctionName, suctionPlaylist);
openHidePlaylist(lofiCover, lofiHide, lofiName, lofiPlaylist);
openHidePlaylist(animeCover, animeHide, animeName, animePlaylist);
openHidePlaylist(rockGayBoysCover, rockGayBoysHide, rockGayBoysName, rockGayBoysPlaylist);
openHidePlaylist(jRockCover, jRockHide, jRockName, jRockPlaylist);
openHidePlaylist(kamishinVibeCover, kamishinVibeHide, kamishinVibeName, kamishinVibePlaylist);