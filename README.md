# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```js
     const lat = 26.453;
      const lon = 87.272;
      const token = "f2e156139b769f19129ad735c7600fb7cecf67be"; // Replace with your API token

      const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            console.log(data);
            console.log("City:", data.data.city.name);
            console.log("AQI:", data.data.aqi);
            console.log("Dominant Pollutant:", data.data.dominentpol);
            console.log("Pollutants:", data.data.iaqi); // PM2.5, PM10, NO2, etc.
          } else {
            console.error("Error fetching data:", data.data);
          }
        })
        .catch((err) => console.error("Fetch error:", err));

      /*

You are an expert AI on air quality and health.
Based on this JSON data, provide a **full report** including:

1. Current air quality status
2. Dominant pollutants
3. Possible reasons for current air quality
4. Health impacts
5. Measures to protect health and improve air quality

JSON:
{
"status": "ok",
"data": {
"city": {
"name": "City Name",
"geo": [26.453, 87.272]
},
"aqi": 100,
"dominantpol": "pm25",
"iaqi": {
"pm25": {
"v": 100
},
"pm10": {
"v": 50
},
"no2": {
"v": 30
}
}
}
}

Expected Report:
City: Kharahiya Basti, Araria, India
Current AQI: 4 (Good)
Dominant Pollutant: SO2
The air is very clean. No health risks for outdoor activities.
Possible Reasons: Low industrial activity, clean weather, good wind dispersion
Health Effects: Safe for everyone, including sensitive groups
Measures: Maintain greenery, avoid burning waste, use public transport, monitor air quality regularly
\*/
```


https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid={apiKey}

