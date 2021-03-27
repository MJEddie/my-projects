let city;
let cityIndex = 9;
let data;

// Get data from API
function getWeather() {
    $.ajax({
        url: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-373C6328-6BF2-41B3-BB3B-147802B82875&format=JSON&locationName=&elementName=&sort=time',
        method: 'GET',
        dataType: 'json',
        success: function(res) {
            data = res.records.locations[0];
            city = data.location;

            selectCity(city);
            showWeather(data, cityIndex)
            showWeek(data, cityIndex)
        }
    });
}

function selectCity(data) {
    let select = document.querySelector('#select');
    for (let i = 0; i < data.length; i++) {
        city = data[i].locationName;
        let value = i;
        select.innerHTML += `
            <option value="${value}">${city}</option>
        `;
    }
}

// 顯示今日天氣
function showWeather(data, cityIndex) {
    $('.today-description').html('');
    cityName = data.location[cityIndex].locationName;
    const weather = data.location[cityIndex].weatherElement;
    const description = weather[6].time[0].elementValue[0].value;
    const minT = `${weather[8].time[0].elementValue[0].value} °C`;
    const maxT = `${weather[12].time[0].elementValue[0].value} °C`;
    let descriptionImg = checkWeather(description);
    let date = new Date().toString();

    $('.today-condition').html(`
    <h1>${cityName}</h1>
    <h2>${date.substr(0,16)}</h2>
    ${descriptionImg}
    <div class="today-description">${description} <br>${minT} / ${maxT}</div>
    `)
}

// 顯示一週預測
function showWeek(data, cityIndex) {
    $('#week').html('');
    const calendar = [];
    const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weather = data.location[cityIndex].weatherElement;
    for (i = 1; i < 7; i++) {
        let timeIndex = 2 * i;
        const day = $('<div></div>').attr('class', `day-${i} col-2`);
        const description = weather[6].time[timeIndex].elementValue[0].value;
        const minT = `${weather[8].time[timeIndex].elementValue[0].value} °C`;
        const maxT = `${weather[12].time[timeIndex].elementValue[0].value} °C`;
        // const rain = `${weather[0].time[timeIndex].elementValue[0].value}  %` !== " " ? weather[0].time[timeIndex].elementValue[0].value : '未有資料';
        let descriptionImg = checkWeather(description);

        // 計算日期、星期
        calendar[i] = {}
        let loopDate = new Date();
        let loopDay = loopDate.getDate() + i;
        let loopValue = loopDate.setDate(loopDay)
        let newDate = new Date(loopValue)
        calendar[i].day = newDate.getDate()
        calendar[i].week = weekDay[newDate.getDay()]

        // 顯示在頁面上
        day.html(`
        <h3>${calendar[i].week}</h3>
        <div class="description">
            ${descriptionImg}
        </div>
        <div class="temp">${minT} / ${maxT}</div>
        <div class="week-description">${description}</div>
        `);
        $('#week').append(day);
    }
}

//確認天氣情況
function checkWeather(description) {
    if (description === '晴時多雲') {
        return '<img src="images/svg/sunny.svg" alt="weather-img">';
    } else if (description === '多雲時晴' || description === '多雲') {
        return '<img src="images/svg/sun-cloudy.svg" alt="weather-img">';
    } else if (description === '多雲時陰' || description === '陰時多雲' || description === '陰天') {
        return '<img src="images/svg/cloudy.svg" alt="weather-img">';
    } else {
        return '<img src="images/svg/rainy.svg" alt="weather-img">';
    }
}

getWeather();

//Event listener
$('#select').change(function() {
    cityIndex = $('#select :selected').val();
    showWeather(data, cityIndex);
    showWeek(data, cityIndex);
});