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

            console.log(Lat,Lng);

            const Response = await axios(`/weather/${Lat},${Lng}`);
            const wData = await Response.data.weather;

            console.log(wData);
        });
    }
    else {
        console.log("uh my ass")
    }
})