document.querySelector("#getLocationText").addEventListener("click", async () => {

    let response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_SzNblVsGgWDZd6RMGXGmgxVdK6ZPw&ipAddress=8.8.8.8");
    let Tdata = await response.json();
    const Lat = Tdata.location.lat;
    const Lng = Tdata.location.lng;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            const Response = await axios(`/weather/${position.coords.latitude},${position.coords.longitude}`);
            const wData = await Response.data.weather;
            console.log(wData)
        });
    } else {
        console.log("geoLocation not available");
    }

})