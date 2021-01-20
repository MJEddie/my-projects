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

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Change song
prevBtn.click(function() {
    prevSong();
});
nextBtn.click(function() {
    nextSong();
});

// Time/song update
$('#audio').bind('timeupdate', function() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.css('width', `${progressPercent}%`);
});

// Click on progress bar
$('#progress-container').click(function(e) {
    const width = $('#progress-container').width();
    const clickX = $(e.target).offset().left;
    const pageX = e.pageX;

    const duration = audio.duration;

    audio.currentTime = ((pageX - clickX) / width) * duration;
});

// song ends
$('#audio').bind('ended', function() {
    nextSong();
});