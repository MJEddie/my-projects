const playBtn = $('#play');
const prevBtn = $('#prev');
const nextBtn = $('#next');

const audio = $('#audio')[0];
const progress = $('#progress');
const title = $('#title');
const cover = $('#cover')[0];

// Song titles
const songs = ['acousticbreeze', 'allthat', 'beyondtheline', 'creativeminds', 'onceagain'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.text(song);
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}