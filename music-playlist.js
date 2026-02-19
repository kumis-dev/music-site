const container = document.querySelector('.playlists-cards');

playlists.forEach(playlist => {
    // создаем карточку плейлиста
    const card = document.createElement('div');
    card.className = `playlist-card ${playlist.className}`;

     // обложка
    const img = document.createElement('img');
    img.className = 'cover-playlist';
    img.src = `${PLAYLIST_COVER_BASE}${playlist.cover}`;

    // скрытый блок с треками
    const hidden = document.createElement('div');
    hidden.className = 'hidden';

    // название плейлиста
    const h2 = document.createElement('h2');
    h2.className = 'playlist-name hidden';
    h2.textContent = playlist.name;

    // список треков
    const ol = document.createElement('ol');
    ol.className = 'playlist-titles';

    playlist.tracks.forEach((track, index) => {
        const li = document.createElement('li'); // li - element of ol list
        li.className = 'playlist-track-title'; // имя класса li
        li.textContent = track; // то что внутри элемента li списка ol

        // клик по треку - запуск в плеере
        li.addEventListener('click', () => {
            const playerFrame = window.parent.document.getElementById('playerFrame');
            if (playerFrame)
                playerFrame.contentWindow.loadPlaylist(playlist.songs, index);
        });

        ol.appendChild(li);
    });

    // собираем карточку
    hidden.appendChild(h2);
    hidden.appendChild(ol);
    card.appendChild(img);
    card.appendChild(hidden);
    container.appendChild(card);

    // клик по обложке — раскрыть/скрыть треки
    img.addEventListener('click', () => {
        hidden.classList.toggle('hidden');
        h1.classList.toggle('hidden');

        document.querySelectorAll('.playlists-cards > div').forEach(p => {
            if (p !== card) 
                p.classList.toggle('hidden');
        });
    });
})