const AUDIO_BASE = 'https://music-site-files.s3.cloud.ru/audios/';
const COVER_BASE = 'https://music-site-files.s3.cloud.ru/covers/';
const PLAYLIST_COVER_BASE = 'https://music-site-files.s3.cloud.ru/cover-playlists/';
const CHANNEL_PICTURES_BASE = 'https://music-site-files.s3.cloud.ru/channel-pictures/';
const THUMBNAIL_BASE = 'https://music-site-files.s3.cloud.ru/thumbnails/';

const suctionSongs = [
  'Duality',
  'Enter Sadman',
  'Psychosocial',
  'Useewa',
  'Gira Gira',
  'Somewhere I Belong',
  'Faint',
  'Never Too Late',
  'Animal I have become',
  'Given Up'
];

const loFiSongs = [
  'Lofi Sleep v1'
];

const animeSongs = [
  'Kick Back'
];

const jRockSongs = [
  'Useewa',
  'Gira Gira',
  'Show',
  'Bakemono',
  'Elf'
];

const rockSongsForGayBoys = [
  'Vendetta',
  'Gehenna',
  'Sufur',
  'Vi Key - diss ms supchik',
  'Wait and Bleed',
  'Never Too Late',
  'Animal I have become',
  'Given Up'
];

const kamishinVibeSongs = [
  'Atl - Youth',
  'Atl - Dance',
  'Evgeniy Trofimov - pizda',
  'Evgeniy Trofimov - 9.11',
  'Nevebalo, Anton Tokar - Poka',
  'Nevebalo - Bridges',
  '25_17 - Room'
];

const playlists = [
  {
    className: 'suction-playlist',
    name: 'Suction',
    cover: 'suction-cover.png',
    songs: suctionSongs,
    tracks: [
      'Slipopi – Duality',
      'Metallica – Enter Sadman',
      'Slipknot – Psychosocial',
      'Ado – Useewa',
      'Ado – Gira Gira',
      'Linkin Park – Somewhere I Belong',
      'Linkin Park – Faint',
      'Three Days Grace - Never Too Late',
      'Three Days Grace - Animal I Have Become',
      'Linkin Park - Given Up'
    ]
  },
  {
    className: 'lofi-playlist',
    name: 'Lofi',
    cover: 'lofi-cover.png',
    songs: loFiSongs,
    tracks: ['Lofi Sleep v1']
  },
  {
    className: 'anime-playlist',
    name: 'Anime-openings',
    cover: 'anime-cover.png',
    songs: animeSongs,
    tracks: ['Chainsawman - Kick Back']
  },
  {
    className: 'jrock-playlist',
    name: 'J-rock',
    cover: 'jrock-cover.png',
    songs: jRockSongs,
    tracks: [
      'Ado - Useewa',
      'Ado - Gira Gira',
      'Ado - Show',
      'YOASOBI - Bakemono',
      'Ado - Elf'
    ]
  },
  {
    className: 'rock-gay-boys-playlist',
    name: 'Gay Boys Playlist',
    cover: 'gayBoysPriors.png',
    songs: rockSongsForGayBoys,
    tracks: [
      'Slipopi - Vendetta',
      'Slipopi - Gehenna',
      'Slipopi - Sufur',
      'Vi Key - diss ms supchik',
      'Slipopi - Wait and Bleed',
      'Three Days Grace - Never Too Late',
      'Three Days Grace - Animal I Have Become',
      'Linkin Park - Given Up'
    ]
  },
  {
    className: 'kamishin-vibe-playlist',
    name: 'Kamishin Vibe',
    cover: 'kamishin-pop-vibe.png',
    songs: kamishinVibeSongs,
    tracks: [
      'Atl - Youth',
      'Atl - Dance',
      'Evgeniy Trofimov - pizda',
      'Evgeniy Trofimov - 9.11',
      'Nevebalo, Anton Tokar - Poka',
      'Nevebalo - Bridges',
      '25_17 - Room'
    ]
  }
];