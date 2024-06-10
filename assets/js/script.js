const apiKey = '23aea221ad655ccd9dd94de4e15df7fb';
const searchBox = $('#search-list');


function getLocation(cityName) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

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
    })
}

function HandleSubmit(event) {
    event.preventDefault();
    const citySearches = JSON.parse(localStorage.getItem('cityName')) || [];

    const cityName = $('#city-search').val();

    citySearches.push(cityName);
    localStorage.setItem('cityName', JSON.stringify(citySearches))
    renderCityList();
}

function createCityList(cityName) {
    // const cityNameBox = $('<div>')
    // searchBox.append(cityNameBox);
    // searchBox.text(cityName);
    // console.log(cityName);

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
    // citySearches.forEach(function(cityName) {
    //     createCityList(cityName);
    // });
    // for(let i = 0; i < citySearches.length; i++) {
    //     createCityList(citySearches[i]);
    // }
}

$(document).ready(function () {
    renderCityList();

    $('#submit').on('click', HandleSubmit);
});

// getLocation('Paris');