import express from 'express';
import axios from 'axios';
import cors from 'cors'
import fetch from 'node-fetch';

const app = express();

app.use(express.static('public'));

app.get('/products/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
  res.header("Access-Control-Allow-Origin");
});

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

app.get("/weather/:latlon", async (req, res) => {
  const latlong = req.params.latlon.split(",");
  console.log(latlong)
  const Lat = latlong[0];
  const Long = latlong[1];

  const weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7f4183b49af04a2e95e120051231103&q=${Lat},${Long}`)
    .catch(err => console.error("something went wrongoooooooo" + err));
  const weatherData = await weatherResponse.json();

  console.log(weatherData);

  const aqResponse = await fetch(`https://api.openaq.org/v2/latest?limit=200&page=1&offset=2&sort=desc&coordinates=${Lat}%2C${Long}&radius=1000&order_by=lastUpdated&dumpRaw=false`)
    .catch(err => console.error("something went wrongoooooooo " + err));
  const aqData = await aqResponse.json();

  const DataS = {
    weather: weatherData,
    air_quality: aqData
  }

  res.json(DataS)
})