const introductionPage = document.querySelector(".introductionPage");

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

            console.log(wData.DataS.weather);

        });
    }
    else {
        console.log("geolocation is not responging")
    }
})

// showing data with search

const locSearchBtn = document.querySelector("#locSearch");
const locationNameInput = document.querySelector("#locationName");

locSearchBtn.addEventListener("click", async () => {
    const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput.value}`)
    const wData = await wResponse.json();
    console.log("hello")
    console.log(wData);
    introductionPage.classList.add("fadeOutIntroductionPage")
})
locationNameInput.addEventListener('keydown', async (event) => {
    let code = event.code;

    if (code == "Enter") {
        const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput.value}`)
        const wData = await wResponse.json();

        console.log(wData);
        introductionPage.classList.add("fadeOutIntroductionPage")
    }
}, false);