document.querySelector("#getLocationText").addEventListener("click", () => {

    if ("geolocation" in navigator) {
        console.log("geolocatoin available");
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
        });
    }
    else{
        console.log("geolocation not available");
    }

})