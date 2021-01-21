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

    console.log(msg)
}

// Event linstener
recognition.addEventListener('result', onSpeak);