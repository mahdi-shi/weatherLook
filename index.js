const express = require('express');
const app = express();
const axios = require("axios").default;;

app.listen(3000,()=>console.log('listen at 3000'));
app.use(express.static('public'));

app.get("/weather/:latlon", async (req, res) => {
    console.log("fetch test");
    const latlong = req.params.latlon.split(",");
    console.log(latlong)
    const Lat = latlong[0];
    const Long = latlong[1];

    const weatherResponse = await axios(`https://api.weather.gov/points/${Lat},${Long}`)
        .catch(err => console.error("something went wrongoooooooo " + err));
    const weatherData = await weatherResponse.data;

    console.log(weatherData);

    const aqResponse = await axios(`https://api.openaq.org/v2/latest?coordinates=${Lat},${Long}`)
        .catch(err => console.error("something went wrong " + err));
    const aqData = await aqResponse.data;

    console.log(aqData);


    const data = {
        weather: weatherData,
        air_quality: aqData
    }

    res.send(data)
})