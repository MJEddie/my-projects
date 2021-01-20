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

// Play song
function playSong() {
    $('#music-container').addClass('play');
    playBtn.find('i.fas').removeClass('fa-play');
    playBtn.find('i.fas').addClass('fa-pause');

    audio.play();
}

// Pause song
function pauseSong() {
    $('#music-container').removeClass('play');
    playBtn.find('i.fas').addClass('fa-play');
    playBtn.find('i.fas').removeClass('fa-pause');

    audio.pause();
}

// Event listeners
playBtn.click(function() {
    const isPlaying = $('#music-container').hasClass('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});