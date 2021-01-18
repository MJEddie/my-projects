// init
let randomWord;
let score = 0;
let time = 10;

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



// Event listeners
$('input').change(function() {
    const answer = $(this);
    if (answer.val() === randomWord) {
        randomWords();
        score++;
        $('#score').text(score)
        time += 5;
        $('#time').text(time)
        answer.val('');
    }
})

randomWords();