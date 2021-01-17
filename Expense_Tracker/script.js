const text = $('#text');
const amount = $('#amount');

let transactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 }
];

function addTransaction(e) {
    e.preventDefault();

    if (text.val().trim() === '' || amount.val().trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.val(),
            amount: parseInt(amount.val())

        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        text.val('');
        amount.val('');
    }
}

// Generate randim ID
function generateID() {
    return Math.floor(Math.random() * 10000);
}

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

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    init();
}

// Init app
function init() {
    $('#list').html('');

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Event Listener
$('#form').submit(addTransaction);