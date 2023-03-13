const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(cors());

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
  
  app.get('/users', async (_req, res) => {
    const url = 'https://randomuser.me/api/';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: 'An error occurred'});
    }
  });
  
  const port = 3000;
  
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`),
  );


app.get("/weather/:latlon", async (req, res) => {
    console.log("fetch test");
    const latlong = req.params.latlon.split(",");
    console.log(latlong)
    const Lat = latlong[0];
    const Long = latlong[1];

    const weatherResponse = await axios.get(`https://api.weather.gov/points/${Lat},${Long}`)
        .catch(err => console.error("something went wrongoooooooo " + err));
    const weatherData = await weatherResponse.data;

    console.log(weatherData);

    const aqResponse = await axios.get(`https://api.openaq.org/v2/latest?coordinates=${Lat},${Long}`)
        .catch(err => console.error("something went wrongoooooooo " + err));
    const aqData = await aqResponse.data;

    const data = {
        weather: weatherData,
        air_quality: aqData
    }

    res.send(data)
})