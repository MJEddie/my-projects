let city;

function getWeather() {
    $.ajax({
        url: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-373C6328-6BF2-41B3-BB3B-147802B82875&format=JSON&locationName=&elementName=&sort=time',
        method: 'GET',
        dataType: 'json',
        success: function(res) {
            city = res.records.locations[0].location;
            console.log(res, city)
            selectCity(city);
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

getWeather();