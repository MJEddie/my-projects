const famousFood = [
    '牛肉麵',
    '小籠包',
    '滷肉飯',
    '大腸麵線',
    '蚵仔煎',
    '臭豆腐',
    '雞排',
    '珍珠奶茶',
    '刨冰',
    '鳳梨酥'
];
const orderItems = [];
const listItems = [];
creatList();

function creatList() {
    [...famousFood]
    .map(data => ({ value: data, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(data => data.value)
        .forEach((food, index) => {
            const orderItem = $('<li></li>').attr('data-index', index);
            orderItem.html(`
            <span class="number ui-state-disabled">${index + 1}</span>
            `)
            const listItem = $('<li></li>').attr('data-index', index);
            listItem.html(`
            <div class="draggable ui-state-default">
                <p class="food-name">${food}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
            `);
            $('#order-list').append(orderItem);
            $('#draggable-list').append(listItem);
        })
}
$('#draggable-list').sortable();