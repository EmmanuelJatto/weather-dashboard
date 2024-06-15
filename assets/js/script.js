const apiKey = '23aea221ad655ccd9dd94de4e15df7fb';
const searchBox = $('#search-list');
const weatherBox = $('#weather-card');

function getLocation(cityName) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        getWeather(lat,lon);
    })


}

function getWeather(lat,lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        createWeatherCard(data);
    })
}

function createWeatherCard(data) {
    weatherBox.empty();

    const fahrenheitTemp = ((data.list[0].main.temp - 273.15) * 1.8) + 32
    const roundedTemp = fahrenheitTemp.toFixed(2);

    const cityName = $('#city-search').val();
    const currentDate = dayjs().format('M/DD/YYYY');

    const weatherCard = $('<div>');
    weatherCard.addClass('card task-card my-3');
    const weatherCardHeader = $('<div>').addClass('card-header h4').text(`${cityName} ${currentDate}`);
    const weatherCardBody = $('<div>').addClass('card-body');
    const weatherCardText = $('<p>').addClass('card-text').text(`Temp: ${roundedTemp}°F`);
    const weatherCardText2 = $('<p>').addClass('card-text').text(`Wind: ${data.list[0].wind.speed} MPH`);
    const weatherCardText3 = $('<p>').addClass('card-text').text(`Humidity: ${data.list[0].main.humidity} %`)

    $('#weather-card').append(weatherCard);
    weatherCard.append(weatherCardHeader);
    weatherCard.append(weatherCardBody);
    weatherCardBody.append(weatherCardText);
    weatherCardBody.append(weatherCardText2);
    weatherCardBody.append(weatherCardText3);


    for(let i = 1; i <= data.list.length; (i += 8)) {
        const forecastCard = $('<div>');
        forecastCard.addClass('card task-card my-3 col-sm-3');
        const forecastCardHeader = $('<div>').addClass('card-header h6').text(`${data.list[i].dt_txt}`);
        const forecastBody = $('<div>').addClass('card-body');
        const forecastText = $('<p>').addClass('card-text').text(`Temp: ${(((data.list[i].main.temp - 273.15) * 1.8) + 32).toFixed(2)}°F`);
        const forecastText2 = $('<p>').addClass('card-text').text(`Wind: ${data.list[i].wind.speed} MPH`);
        const forecastText3 = $('<p>').addClass('card-text').text(`Humidity: ${data.list[i].main.humidity} %`)

        $('#forcast').append(forecastCard);
        forecastCard.append(forecastCardHeader);
        forecastCard.append(forecastBody);
        forecastBody.append(forecastText);
        forecastBody.append(forecastText2);
        forecastBody.append(forecastText3);
    }
}

function HandleSubmit(event) {
    event.preventDefault();
    const citySearches = JSON.parse(localStorage.getItem('cityName')) || [];

    const cityName = $('#city-search').val();

    citySearches.push(cityName);
    localStorage.setItem('cityName', JSON.stringify(citySearches));
    getLocation(cityName);
    renderCityList();
}

function createCityList(cityName) {

    let citySearches = JSON.parse(localStorage.getItem('cityName')) || [];
    
    for(i = 0; i < citySearches.length; i ++) {
        const newSection = $('<div>');
        newSection.addClass('custom-box mt-3');
        searchBox.append(newSection);
        const textBox = $('<div>')
        textBox.text(citySearches[i]);
        newSection.append(textBox);
    }
}

function renderCityList() {
    searchBox.empty();

    let citySearches = JSON.parse(localStorage.getItem('cityName')) || [];

    createCityList();
}

$(document).ready(function () {
    renderCityList();

    $('#submit').on('click', HandleSubmit);
});
