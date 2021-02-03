let city;
let cityIndex = 9;
let data;

let timeNow = new Date();

function getWeather() {
    $.ajax({
        url: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-373C6328-6BF2-41B3-BB3B-147802B82875&format=JSON&locationName=&elementName=&sort=time',
        method: 'GET',
        dataType: 'json',
        success: function(res) {
            data = res.records.locations[0];
            city = data.location;
            console.log(data)
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

function showWeather(data, cityIndex) {
    cityName = data.location[cityIndex].locationName;
    const weather = data.location[cityIndex].weatherElement;
    const description = weather[6].time[0].elementValue[0].value;
    const minT = `${weather[8].time[0].elementValue[0].value} °C`;
    const maxT = `${weather[12].time[0].elementValue[0].value} °C`;
    let date = timeNow.toGMTString();
    $('.today-description').html(`
    <h1>${cityName}</h1>
    <h2>${date.substr(0,16)}</h2>
    <img src="images/svg/sun.svg" alt="weather-img">
    <div class="today-description">${description} <br>${minT} / ${maxT}</div>
    `)
}

function showWeek(data, cityIndex) {
    $('#week').html('');
    const weather = data.location[cityIndex].weatherElement;
    for (i = 1; i < 7; i++) {
        let timeIndex = 2 * i;
        const day = $('<div></div>').attr('class', `day-${i}`);
        const description = weather[6].time[timeIndex].elementValue[0].value;
        const minT = `${weather[8].time[timeIndex].elementValue[0].value} °C`;
        const maxT = `${weather[12].time[timeIndex].elementValue[0].value} °C`;
        const rain = weather[0].time[timeIndex].elementValue[0].value !== " " ? weather[0].time[timeIndex].elementValue[0].value : 0;
        day.html(`
        <h3>週二</h3>
        <div class="description">
            <img src="images/svg/sun.svg" alt="weather-img">
        </div>
        <div class="temp">${minT} / ${maxT}</div>
        <div class="week-description">${description}</div>
        <div class="rain">降雨機率 : ${rain} %</div> 
        `)
        $('#week').append(day);
    }
}

getWeather();

$('#select').change(function() {
    cityIndex = $('#select :selected').val();
    showWeather(data, cityIndex);
    showWeek(data, cityIndex);
});