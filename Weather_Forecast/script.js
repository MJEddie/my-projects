let city;
let cityIndex = 9;
let data;

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
    console.log(maxT)
    $('.description').html(`
    <h1>${cityName}</h1>
    <h2>Monday, 1 February 2021</h2>
    <img src="images/svg/sun.svg" alt="weather-img">
    <div class="today-description">${description} <br>${minT} / ${maxT}</div>
    `)
}

getWeather();

$('#select').change(function() {
    cityIndex = $('#select :selected').val();
    showWeather(data, cityIndex);
});