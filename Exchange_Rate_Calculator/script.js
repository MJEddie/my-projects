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

calculate();