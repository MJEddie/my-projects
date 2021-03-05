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

creatList();

function creatList() {
    [...famousFood]
    .map(data => ({ value: data, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(data => data.value)
        .forEach((food, index) => {
            // 排名的 list
            const orderItem = $('<li></li>').attr('data-index', index);
            orderItem.html(`
            <span class="number">${index + 1}</span>
            `)
            const foodItem = $('<li></li>').attr('data-index', index);
            foodItem.html(`
            <div class="draggable">
                <p class="food-name">${food}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
            `);
            $('#order-list').append(orderItem);
            $('#draggable-list').append(foodItem);
        })
}

// Check order
function checkOrder() {
    // 抓取每一個 list 檢查名稱是否相符
    const draggableList = $('#draggable-list li')
    draggableList.each((index, listItem) => {
        const foodName = listItem.querySelector('.draggable').innerText.trim();
        if (foodName !== famousFood[index]) {
            listItem.classList.remove('right');
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

// jQuery sortable UI
$('#draggable-list').sortable();
$('#draggable-list').disableSelection();

// Event listener
$('#check').click(checkOrder);