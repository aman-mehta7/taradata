import React, { useState } from "react";
import Scene from "./3js/Scene";
import Nav from "./components/Nav";
import Story from "./components/Story";
import ScrollInfo from "./components/ScrollInfo";
import NormalText from "./components/NormalText";
import Maps from "./components/Maps.jsx";

const App = () => {
  const [story, setStory] = useState(false);
  const [data, setData] = useState(false); // new state for data by abhi

  // const fetchLatestPowerData = async () => {
  //   // const latitude = 26.453;
  //   // const longitude = 87.272;
  //   const latitude = 26.5;  // round to nearest grid
  //   const longitude = 87.25;

  //   // Fetch last 10 days
  //   const today = new Date();
  //   const past = new Date();
  //   past.setDate(today.getDate() - 10);

  //   // format YYYYMMDD
  //   const formatDate = d =>
  //     `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
  //       d.getDate()
  //     ).padStart(2, "0")}`;

  //   const startStr = formatDate(past);
  //   const endStr = formatDate(new Date(today.setDate(today.getDate() - 1))); // yesterday

  //   // Parameters you want from POWER
  //   // const parameters = "TS,ALLSKY_SFC_SW_DWN";
  //   const parameters = "SSE"

  //   const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${parameters}&start=${startStr}&end=${endStr}&latitude=${latitude}&longitude=${longitude}&community=AG&format=JSON`;

  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) throw new Error(`HTTP error ${response.status}`);

  //     const data = await response.json();

  //     if (!data.properties || !data.properties.parameter) {
  //       console.error("No data available in this range.");
  //       return null;
  //     }

  //     const TS = data.properties.parameter.TS;
  //     const radiation = data.properties.parameter.ALLSKY_SFC_SW_DWN;

  //     // Get latest non-null value
  //     const latestDate = Object.keys(TS)
  //       .reverse()
  //       .find(date => TS[date] !== null);

  //     if (!latestDate) {
  //       console.error("No valid data points found.");
  //       return null;
  //     }

  //     console.log(`Latest available date: ${latestDate}`);
  //     console.log(`Temperature: ${TS[latestDate]} °C`);
  //     console.log(`Solar Radiation: ${radiation[latestDate]} MJ/m²/day`);

  //     return {
  //       date: latestDate,
  //       temperature: TS[latestDate],
  //       radiation: radiation[latestDate],
  //     };
  //   } catch (error) {
  //     console.error("Error fetching POWER data:", error);
  //     return null;
  //   }
  // };

  // fetchLatestPowerData();


  return (
    <main className="relative overflow-hidden">
      {/* <Story story={story} /> */}
      <nav>
        <Nav story={story} setStory={setStory} data={data} setData={setData} />
        {/* passing data and setData by abhi */}
      </nav>
      {story ? <ScrollInfo /> : null}

      {/* By abhi */}
      {data ? <Maps /> : null}
      {/* <ScrollInfo />   */}
      <NormalText />
      <section>
        <Scene story={story} />
      </section>
    </main>
  );
};

export default App;
