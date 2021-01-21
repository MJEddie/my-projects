const finalNumber = randomNumber();

console.log(finalNumber)

// Generate random number
function randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}