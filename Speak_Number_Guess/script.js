const finalNumber = randomNumber();

console.log(finalNumber)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();

recognition.start();

// Generate random number
function randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    checkNumber(msg);
    console.log(msg)
}

function checkNumber(msg) {
    const number = parseInt(msg);
    $('#msg').html(`
            <div>You said: </div>
            <span class="box">${msg}</span>
        `)

    if (isNaN(number)) {
        $('#msg').append(`<div>That is not a valid number</div>`);
    } else if (number > 100 || number < 1) {
        $('#msg').append(`<div>Number must be between 1 and 100</div>`)
    } else if (number == randomNumber) {
        $('body').html(`
            <h2>Congrats! You have guessed the number! <br><br>
            It was ${number}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `)
    } else if (number > randomNumber) {
        $('msg').append('<div>GO LOWER</div>');
    } else {
        $('msg').append('<div>GO HIGHER</div>');
    }
}

// Event linstener
recognition.addEventListener('result', onSpeak);