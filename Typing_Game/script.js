// init
let randomWord;
let score = 0;
let time = 20;

// Generate random word
function randomWords() {
    fetch('https://data.taipei/api/v1/dataset/f18de02f-b6c9-47c0-8cda-50efad621c14?scope=resourceAquire')
        .then(res => res.json())
        .then(data => {
            const words = data.result.results;
            randomWord = words[Math.floor(Math.random() * words.length)].F_Name_Latin;
            $('h1').text(randomWord);
        })
}

// Countdown time
function countDownTime() {
    time--;
    $('#time').text(`${time}s`);
}

// Event listeners
$('input').keyup(function() {
    const answer = $(this);
    const difficulty = $('#difficulty').val();
    if (answer.val() === randomWord) {
        randomWords();
        score++;
        $('#score').text(score);
        answer.val('');

        if (difficulty === 'easy') {
            time += 15;
        } else if (difficulty === 'medium') {
            time += 10;
        } else {
            time += 5;
        }
        countDownTime();
    }
})

const intervalid = setInterval(() => {
    if (time == 0) {
        clearInterval(intervalid);
    } else {
        countDownTime();
    }
}, 1000)

randomWords();