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

    $('#seconds').text(formatTime(sec));
    $('#minutes').text(formatTime(min));
    $('#hours').text(formatTime(hour));
    $('#days').text(formatTime(day));
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

const intervalId = setInterval(() => {
        const result = countDownTime - (new Date());
        if (result < 0) {
            clearInterval(intervalId);
        } else {
            remainTime();
        }
    },
    1000);