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
    $('#time').text(`${time}s`);
    time--;
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
            time += 10;
        } else if (difficulty === 'medium') {
            time += 8;
        } else {
            time += 5;
        }
        countDownTime();
    }
})

$('#settings-btn').click(function() {
    $('#settings').toggleClass('hide');
})

const intervalid = setInterval(() => {
    if (time < 0) {
        clearInterval(intervalid);
        $('#end-game-container').html(`
            <h1>Time ran out</h1>
            <p>Your final score is ${score}</p>
            <button onclick="location.reload()">Reload</button>
        `).attr('style', 'display:flex;');
    } else {
        countDownTime();
    }
}, 1000)

randomWords();