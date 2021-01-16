const container = $('.container');
const seats = $('.row .seat:not(.occupied)');
const count = $('#count');
const total = $('#total');
const movieSelect = $('#movie');

let ticketPrice = parseInt(movieSelect.val());

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = $('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    });

    const selectedSeatsCount = selectedSeats.length;

    if (selectedSeatsCount > 1) {
        $('#seat').text('seats');
    } else {
        $('#seat').text('seat');
    }

    count.text(selectedSeatsCount);
    total.text(selectedSeatsCount * ticketPrice);

    setMovieData(movieSelect.get(0).selectedIndex, movieSelect.val());
}

// Event Listeners
movieSelect.change(function() {
    ticketPrice = parseInt($(this).val());
    setMovieData($(this).get(0).selectedIndex, $(this).val());
    updateSelectedCount();
});

container.click(function(e) {
    if ($(e.target).hasClass('seat') && !$(e.target).hasClass('occupied')) {
        $(e.target).toggleClass('selected');

        updateSelectedCount();
    }
});