// Fetch exchange rates API
function calculate() {
    const currencyOne = $('#currency-one').val();
    const currencyTwo = $('#currency-two').val();

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {

            const rate = data.rates[currencyTwo];

            $('#rate').text(`1 ${currencyOne} = ${rate} ${currencyTwo}`);

            $('#amount-two').val(($('#amount-one').val() * rate).toFixed(2));
        });
}

// Event Listeners
$('#currency-one').change(function() {
    calculate();
});
$('#currency-two').change(function() {
    calculate();
});
$('#amount-one').change(function() {
    calculate();
});

$('#swap').click(function() {
    const temp = $('#currency-one').val();
    $('#currency-one').val($('#currency-two').val());
    $('#currency-two').val(temp);
    calculate();
})

calculate();