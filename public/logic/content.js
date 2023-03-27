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
            setTimeout(() =>{
                introductionPage.style.display = "none"
            },500)
            fadeInForecastPanel()
            setTimeout(() =>{
                statusBgImage.style.top = "-88vh"
                statusBgImage.style.opacity = "1";
                backgroundStatusCover.style.top = "-948h";
                backgroundStatusCover.style.opacity = "1";
            },3000)
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
const backgroundStatusCover = document.querySelector("#backgroundStatusCover")

locSearchBtn.addEventListener("click", async () => {
    const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput.value}`)
    const wData = await wResponse.json();
    console.log("hello")
    console.log(wData);
    fadeOutIntro()
    introductionPage.style.opacity = "0";
    setTimeout(() =>{
        introductionPage.style.display = "none"
    },500)
    fadeInForecastPanel()
    setTimeout(() =>{
        statusBgImage.style.top = "-88vh"
        statusBgImage.style.opacity = "1";
        backgroundStatusCover.style.top = "-98vh";
        backgroundStatusCover.style.opacity = "1";
    },3000)
})
locationNameInput.addEventListener('keydown', async (event) => {
    let code = event.code;

    if (code == "Enter") {
        const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput.value}`)
        const wData = await wResponse.json();

        console.log(wData);
        fadeOutIntro();
        introductionPage.style.opacity = "0";
        setTimeout(() =>{
            introductionPage.style.display = "none"
        },500)
        fadeInForecastPanel()
        setTimeout(() =>{
            statusBgImage.style.top = "-88vh"
            statusBgImage.style.opacity = "1";
            backgroundStatusCover.style.top = "-98vh";
            backgroundStatusCover.style.opacity = "1";
        },3000)
    }
}, false);

locSearchBtn2.addEventListener("click", async () => {
    const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput2.value}`)
    const wData = await wResponse.json();
    console.log(wData);
})
locationNameInput2.addEventListener('keydown', async (event) => {
    let code = event.code;

    if (code == "Enter") {
        const wResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${locationNameInput2.value}`)
        const wData = await wResponse.json();
        console.log(wData);
    }
}, false);

//fade out introduction page function

const introductionPage = document.querySelector(".introductionPage");
const forecastPanel = document.querySelector(".forecast")

function fadeOutIntro() {
    introductionPage.classList.add("fadeOutIntroductionPage")
}

function fadeInForecastPanel(){
    forecastPanel.classList.add("fadeInForecastPanel")
    forecastPanel.classList.add("align-items-start")
    forecastPanel.style.display = "flex"
    forecastPanel.style.transition = "0.5s"
    setTimeout(() =>{
        forecastPanel.style.opacity = "1";
        forecastPanel.style.marginTop = "0px"
    },500)
}