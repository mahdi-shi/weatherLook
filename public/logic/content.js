//base data for geolocate

document.querySelector("#getLocationText").addEventListener("click", async () => {

    //let response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_SzNblVsGgWDZd6RMGXGmgxVdK6ZPw&ipAddress=8.8.8.8");
    //let Tdata = await response.json();

    if ("geolocation" in navigator) {

        let Lat;
        let Lng;

        const watchID = navigator.geolocation.watchPosition(async position => {
            console.log(position.coords.latitude, position.coords.longitude);
            Lat = position.coords.latitude;
            Lng = position.coords.longitude;

            console.log(Lat, Lng);

            const Response = await axios(`/weather/${Lat},${Lng}`);
            const waData = await Response.data.weather;


            const forcastWeatherUrl = waData.properties.forecast;

            const aqData = await Response.data.air_quality;

            console.log(aqData);

            const aqParameters = aqData.results[0].measurements[0].parameter;
            const aqValue = aqData.results[0].measurements[0].value;
            const aqLastUpdated = aqData.results[0].measurements[0].lastUpdated;
            const aqUnit = aqData.results[0].measurements[0].unit;

            const forcastResponse = await axios.get(forcastWeatherUrl);
            const dataForcast = await forcastResponse.data;

            console.log(dataForcast);
        });
    }
    else {
        console.log("geolocation is not responging")
    }
})

// showing data with search

const locSearchBtn = document.querySelector("#locSearch");
const locationNameInput = document.querySelector("#locationName");

locSearchBtn.addEventListener("click",async() =>{
    const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput.value}`)
    const wData = await wResponse.json();

    console.log(wData);
})