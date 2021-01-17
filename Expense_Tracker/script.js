const text = $('#text');
const amount = $('#amount');

let transactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 }
];

// Add transactions on list
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = $('<li></li>').appendTo('#list');

    item.addClass(transaction.amount < 0 ? 'minus' : 'plus');

    item.html(`${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
     <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    $('#balance').text(`$${total}`);
    $('#money-plus').text(`$${income}`);
    $('#money-minus').text(`$${expense}`);
}
// Init app
function init() {
    $('#list').html('');

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();