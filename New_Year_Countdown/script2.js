const currentYear = new Date().getFullYear();
const countDownTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
$('h1').text(`${currentYear +1} is coming...`);