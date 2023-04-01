document.querySelector("#getLocationText").addEventListener("click", async () => {

    if ("geolocation" in navigator) {
        let Lat;
        let Lng;

        navigator.geolocation.watchPosition(async position => {
            console.log(position.coords.latitude, position.coords.longitude);
            Lat = position.coords.latitude;
            Lng = position.coords.longitude;

            const response = await fetch(`/weather/${Lat},${Lng}`)
            const wData = await response.json();

            console.log(wData.weather);

            fadeOutIntro();
            introductionPage.style.opacity = "0";
            setTimeout(() => {
                introductionPage.style.display = "none"
            }, 500)
            fadeInForecastPanel()
            setTimeout(() => {
                statusBgImage.style.top = "-88vh"
                statusBgImage.style.opacity = "1";
                backgroundStatusCover.style.top = "-948h";
                backgroundStatusCover.style.opacity = "1";
            }, 3000)
            locationText.textContent = "heh"
        });
    }
    else {
        console.log("geolocation is not responging")
    }
})

// showing data with search

const locSearchBtn = document.querySelector("#locSearch");
const locationNameInput = document.querySelector("#locationName");
const locSearchBtn2 = document.querySelector("#locSearch2");
const locationNameInput2 = document.querySelector("#locationName2");
const statusBgImage = document.querySelector("#backgroundStatus");
const backgroundStatusCover = document.querySelector("#backgroundStatusCover");
const locationText = document.querySelector("#Location");
const pictureStatus = document.querySelector("#imageStatus");
const tempText = document.querySelector("#temp");
const statusExplaination = document.querySelector("#statusExplaination");
const windText = document.querySelector("#wind");
const visibilityText = document.querySelector("#visibility");
const airQualityText = document.querySelector("#airQuality");
const humidityText = document.querySelector("#humidity");
const degree = document.querySelector("#degree");
let degreeStatus = false;
const feelsLike = document.querySelector("#feelsLike");
const imageStatus = document.querySelector("#imageStatus");

locSearchBtn.addEventListener("click", async () => {
    const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput.value}`)
    const wData = await wResponse.json();
    console.log("hello")
    console.log(wData);
    fadeOutIntro()
    introductionPage.style.opacity = "0";
    setTimeout(() => {
        introductionPage.style.display = "none"
    }, 500)
    fadeInForecastPanel()
    setTimeout(() => {
        statusBgImage.style.top = "-88vh"
        statusBgImage.style.opacity = "1";
        backgroundStatusCover.style.top = "-98vh";
        backgroundStatusCover.style.opacity = "1";
    }, 3000)
    locationText.textContent = wData.location.country+" / "+wData.location.name;
    tempText.innerHTML = wData.current.temp_c + "°";
    degree.addEventListener("click", () => {
        if (degreeStatus == false) {
            degree.textContent = "F"
            tempText.innerHTML = wData.current.temp_f + "°";
            feelsLike.textContent = "Feels like " + wData.current.feelslike_f;
            degreeStatus = true;
        }
        else {
            degree.textContent = "C"
            tempText.innerHTML = wData.current.temp_c + "°";
            feelsLike.textContent = "Feels like " + wData.current.feelslike_c;
            degreeStatus = false;
        }
    })
    statusExplaination.textContent = wData.current.condition.text;
    windText.textContent = "Wind   " + wData.current.wind_kph + " km/h"
    visibilityText.textContent = "Visibility   " + wData.current.vis_km + " km"
    humidityText.textContent = "Humidity   " + wData.current.humidity + " %"
    feelsLike.textContent = "Feels like  " + wData.current.feelslike_c;

    const airResponse = await fetch(`https://api.openaq.org/v2/latest?limit=200&page=1&offset=2&sort=desc&coordinates=${wData.location.lat}%2C${wData.location.lon}&radius=1000&order_by=lastUpdated&dumpRaw=false`)
    const airData = await airResponse.json();

    console.log(airData)
    airQualityText.textContent = "Air quality   " + airData.results[0].measurements[0].value;

    imageStatusIconShow();

})

function imageStatusIconShow() {

    let conditionStatus = statusExplaination.textContent;

    switch (conditionStatus) {
        case "Patchy rain possible": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-rain" viewBox="0 0 16 16">
            <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
          </svg>`
            statusBgImage.src = "assets/storm.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(20, 20, 20), #292e3d)";
            break;
        }
        case "Light rain shower": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-rain-heavy" viewBox="0 0 16 16">
            <path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1z"/>
          </svg>`
            statusBgImage.src = "assets/rainy (2).jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(63, 81, 97), #292e3d)";
            break;
        }
        case "Partly cloudy": {
            imageStatus.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-clouds" viewBox="0 0 16 16">
            <path d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.513 3.513 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.587 5.587 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5z"/>
            <path d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.502 4.502 0 0 1 7 5zm3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492V9.5z"/>
          </svg>`
            statusBgImage.src = "assets/cloudy.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(37, 37, 37), #292e3d)";
            break;
        }
        case "Overcast": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-clouds" viewBox="0 0 16 16">
            <path d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.513 3.513 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.587 5.587 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5z"/>
            <path d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.502 4.502 0 0 1 7 5zm3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492V9.5z"/>
          </svg>`
            statusBgImage.src = "assets/freshCloud.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(0, 10, 68), #292e3d)";
            break;
        }
        case "Sunny": {
            imageStatus.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-brightness-high" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
          </svg>`
            statusBgImage.src = "assets/sunny3.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(7, 89, 184), #292e3d)";
            break;
        }
        case "Clear": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-brightness-low" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm.5-9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm5-5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm-11 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9.743-4.036a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm-7.779 7.779a.5.5 0 1 1-.707-.707.5.5 0 0 1 .707.707zm7.072 0a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707zM3.757 4.464a.5.5 0 1 1 .707-.707.5.5 0 0 1-.707.707z"/>
          </svg>`;
            statusBgImage.src = "assets/sunny2.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(14, 201, 248), #292e3d)";
            break;
        }
        case "Moderate or heavy rain with thunder": {
            imageStatus.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-lightning-rain" viewBox="0 0 16 16">
            <path d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-.753-8.499a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1zM7.053 11.276A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724l1-2z"/>
          </svg>`
            statusBgImage.src = "assets/thunder.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(39, 39, 39), #292e3d)";
            break;
        }
        case "Thundery outbreaks possible": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-lightning" viewBox="0 0 16 16">
            <path d="M13.405 4.027a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1zM7.053 11.276A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724l1-2z"/>
          </svg>`
            statusBgImage.src = "assets/thunder.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(39, 39, 39), #292e3d)";
            break;
        }
        case "Cloudy": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-clouds" viewBox="0 0 16 16">
            <path d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.513 3.513 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.587 5.587 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5z"/>
            <path d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.502 4.502 0 0 1 7 5zm3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492V9.5z"/>
          </svg>`;
            statusBgImage.src = "assets/cloudy.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(58, 58, 58), #292e3d)";
            break;
        }
        case "Light drizzle": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">
            <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
          </svg>`
            statusBgImage.src = "assets/rainy3.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(22, 22, 22), #292e3d)";
            break;
        }
        case "Light rain": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">
            <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
          </svg>`
            statusBgImage.src = "assets/rainy (3).jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(22, 22, 22), #292e3d)";
            break;
        }
        case "Mist": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-haze" viewBox="0 0 16 16">
            <path d="M4 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm2 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM13.405 4.027a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1z"/>
          </svg>`
            statusBgImage.src = "assets/mist.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(144, 173, 187), #292e3d)";
            break;
        }
        case "Blizzard": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-snow" viewBox="0 0 16 16">
            <path d="M13.405 4.277a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973zM8.5 1.25a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1-.001 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1.25zM2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm2.75 2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-2.75-2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25z"/>
          </svg>`
            statusBgImage.src = "assets/mist.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(144, 173, 187), #292e3d)";
            break;
        }
        case "Patchy heavy snow": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-snow" viewBox="0 0 16 16">
            <path d="M13.405 4.277a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973zM8.5 1.25a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1-.001 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1.25zM2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm2.75 2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-2.75-2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25z"/>
          </svg>`
            statusBgImage.src = "assets/heavySnow.jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(248, 248, 248), #292e3d)";
            break;
        }
        case "Light freezing rain": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">
            <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
          </svg>`
            statusBgImage.src = "assets/rainy (3).jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(22, 22, 22), #292e3d)";
            break;
        }
        case "Light snow": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-sleet" viewBox="0 0 16 16">
            <path d="M13.405 4.027a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1zM2.375 13.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 1 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zM6.375 13.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 1 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zm2.151 2.447a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 1 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223z"/>
          </svg>`
            statusBgImage.src = "assets/snow (2).jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(233, 241, 243), #292e3d)";
            break;
        }
        case "Moderate rain": {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-rain-heavy" viewBox="0 0 16 16">
            <path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1z"/>
          </svg>`
            statusBgImage.src = "assets/rainy (3).jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(22, 22, 22), #292e3d)";
            break;
        }
        default: {
            imageStatus.innerHTML = `<svg id="imageStatus2" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-cloud-rain-heavy" viewBox="0 0 16 16">
            <path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 1 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1z"/>
          </svg>`
            statusBgImage.src = "assets/rainy (3).jpg"
            backgroundStatusCover.style.backgroundImage = "linear-gradient(rgb(22, 22, 22), #292e3d)";
            return false
        }
    }
    console.log(conditionStatus);

}

locationNameInput.addEventListener('keydown', async (event) => {
    let code = event.code;

    if (code == "Enter") {
        const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput.value}`)
        const wData = await wResponse.json();
        console.log("hello")
        console.log(wData);
        fadeOutIntro()
        introductionPage.style.opacity = "0";
        setTimeout(() => {
            introductionPage.style.display = "none"
        }, 500)
        fadeInForecastPanel()
        setTimeout(() => {
            statusBgImage.style.top = "-88vh"
            statusBgImage.style.opacity = "1";
            backgroundStatusCover.style.top = "-98vh";
            backgroundStatusCover.style.opacity = "1";
        }, 3000)
        locationText.textContent = wData.location.country+" / "+wData.location.name;
        tempText.innerHTML = wData.current.temp_c + "°";
        degree.addEventListener("click", () => {
            if (degreeStatus == false) {
                degree.textContent = "F"
                tempText.innerHTML = wData.current.temp_f + "°";
                feelsLike.textContent = "Feels like " + wData.current.feelslike_f;
                degreeStatus = true;
            }
            else {
                degree.textContent = "C"
                tempText.innerHTML = wData.current.temp_c + "°";
                feelsLike.textContent = "Feels like " + wData.current.feelslike_c;
                degreeStatus = false;
            }
        })
        statusExplaination.textContent = wData.current.condition.text;
        windText.textContent = "Wind   " + wData.current.wind_kph + " km/h"
        visibilityText.textContent = "Visibility   " + wData.current.vis_km + " km"
        humidityText.textContent = "Humidity   " + wData.current.humidity + " %"
        feelsLike.textContent = "Feels like  " + wData.current.feelslike_c;

        const airResponse = await fetch(`https://api.openaq.org/v2/latest?limit=200&page=1&offset=2&sort=desc&coordinates=${wData.location.lat}%2C${wData.location.lon}&radius=1000&order_by=lastUpdated&dumpRaw=false`)
        const airData = await airResponse.json();

        console.log(airData)
        try{
            airQualityText.textContent = "Air quality   " + airData.results[0].measurements[0].value;
        }
        catch{
            console.log("can't find air quality in this location");
        }

        imageStatusIconShow()
    }
}, false);

locSearchBtn2.addEventListener("click", async () => {
    const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput2.value}`)
    const wData = await wResponse.json(); 
    locationText.textContent = wData.location.country+" / "+wData.location.name;
    tempText.innerHTML = wData.current.temp_c + "°";

    degree.addEventListener("click", () => {
        if (degreeStatus == false) {
            degree.textContent = "F"
            tempText.innerHTML = wData.current.temp_f + "°";
            feelsLike.textContent = "Feels like " + wData.current.feelslike_f;
            degreeStatus = true;
        }
        else {
            degree.textContent = "C"
            tempText.innerHTML = wData.current.temp_c + "°";
            feelsLike.textContent = "Feels like " + wData.current.feelslike_c;
            degreeStatus = false;
        }
    })
    statusExplaination.textContent = wData.current.condition.text;
    windText.textContent = "Wind   " + wData.current.wind_kph + " km/h"
    visibilityText.textContent = "Visibility   " + wData.current.vis_km + " km"
    humidityText.textContent = "Humidity   " + wData.current.humidity + " %"
    feelsLike.textContent = "Feels like  " + wData.current.feelslike_c;

    const airResponse = await fetch(`https://api.openaq.org/v2/latest?limit=200&page=1&offset=2&sort=desc&coordinates=${wData.location.lat}%2C${wData.location.lon}&radius=1000&order_by=lastUpdated&dumpRaw=false`)
    const airData = await airResponse.json();
    try{
        airQualityText.textContent = "Air quality   " + airData.results[0].measurements[0].value;
    }
    catch{
        console.log("can't find air quality in this location");
    }
    locationNameInput2.value = "";

    statusBgImage.classList.add("refreshBgImage");
    backgroundStatusCover.classList.add("refreshBgImageCover");

    setTimeout(() => {
        statusBgImage.classList.remove("refreshBgImage");
        backgroundStatusCover.classList.remove("refreshBgImageCover");
    }, 1000);
    imageStatusIconShow()

})
locationNameInput2.addEventListener('keydown', async (event) => {
    let code = event.code;

    if (code == "Enter") {
        const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput2.value}`)
        const wData = await wResponse.json();
        locationText.textContent = wData.location.country+" / "+wData.location.name;
        tempText.innerHTML = wData.current.temp_c + "°";

        degree.addEventListener("click", () => {
            if (degreeStatus == false) {
                degree.textContent = "F"
                tempText.innerHTML = wData.current.temp_f + "°";
                feelsLike.textContent = "Feels like " + wData.current.feelslike_f;
                degreeStatus = true;
            }
            else {
                degree.textContent = "C"
                tempText.innerHTML = wData.current.temp_c + "°";
                feelsLike.textContent = "Feels like " + wData.current.feelslike_c;
                degreeStatus = false;
            }
        })
        statusExplaination.textContent = wData.current.condition.text;
        windText.textContent = "Wind   " + wData.current.wind_kph + " km/h"
        visibilityText.textContent = "Visibility   " + wData.current.vis_km + " km"
        humidityText.textContent = "Humidity   " + wData.current.humidity + " %"
        feelsLike.textContent = "Feels like  " + wData.current.feelslike_c;

        const airResponse = await fetch(`https://api.openaq.org/v2/latest?limit=200&page=1&offset=2&sort=desc&coordinates=${wData.location.lat}%2C${wData.location.lon}&radius=1000&order_by=lastUpdated&dumpRaw=false`)
        const airData = await airResponse.json();
        console.log(airData)
        try{
            airQualityText.textContent = "Air quality   " + airData.results[0].measurements[0].value;
        }
        catch{
            console.log("can't find air quality in this location");
        }        locationNameInput2.value = "";

        statusBgImage.classList.add("refreshBgImage");
        backgroundStatusCover.classList.add("refreshBgImageCover");

        setTimeout(() => {
            statusBgImage.classList.remove("refreshBgImage");
            backgroundStatusCover.classList.remove("refreshBgImageCover");
        }, 1000);
        imageStatusIconShow();
    }
}, false);

//fade out introduction page function

const introductionPage = document.querySelector(".introductionPage");
const forecastPanel = document.querySelector(".forecast")

function fadeOutIntro() {
    introductionPage.classList.add("fadeOutIntroductionPage")
}

function fadeInForecastPanel() {
    forecastPanel.classList.add("fadeInForecastPanel")
    forecastPanel.classList.add("align-items-start")
    forecastPanel.style.display = "flex"
    forecastPanel.style.transition = "0.5s"
    setTimeout(() => {
        forecastPanel.style.opacity = "1";
        forecastPanel.style.marginTop = "0px"
    }, 500)
}