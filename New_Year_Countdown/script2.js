const currentYear = new Date().getFullYear();
const countDownTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
$('h1').text(`${currentYear +1} is coming...`);

function remainTime() {
    const timeNow = new Date();
    const result = countDownTime - timeNow;

    const sec = Math.floor(result / 1000) % 60;
    const min = Math.floor(result / 1000 / 60) % 60;
    const hour = Math.floor(result / 1000 / 60 / 60) % 24;
    const day = Math.floor(result / 1000 / 60 / 60 / 24);

    $('#seconds').text(sec);
    $('#minutes').text(min);
    $('#hours').text(hour);
    $('#days').text(day);
    console.log(day, hour, min, sec)
}

remainTime();