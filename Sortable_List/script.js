const draggable_list = $('#draggable-list')[0];
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
let dragStartIndex;
creatList();

function creatList() {
    [...famousFood]
    .map(data => ({ value: data, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(data => data.value)
        .forEach((food, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="food-name">${food}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
                `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });

    addEventListeners();
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const foodName = listItem.querySelector('.draggable').innerText.trim();

        if (foodName !== famousFood[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

$('#check').click(checkOrder);