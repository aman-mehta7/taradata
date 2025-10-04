// // import React, { useEffect, useState } from "react";

// // const MapsData = ({ lat, lng }) => {
// //     const [airData, setAirData] = useState(null);
// //     const [error, setError] = useState(null);

// //     // Fetch air quality data from OpenWeatherMap dynamically
// //     useEffect(() => {
// //         if (!lat || !lng) return;

// //         const fetchAirQualityData = async () => {
// //             const apiKey = "b6dece846bbb74f864220bc44a524c54"; // Your API key
// //             const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${apiKey}`;

// //             try {
// //                 const response = await fetch(url);
// //                 if (!response.ok)
// //                     throw new Error(`HTTP error! status: ${response.status}`);
// //                 const data = await response.json();
// //                 setAirData(data);
// //             } catch (err) {
// //                 console.error("Error fetching air quality data:", err);
// //                 setError(err.message);
// //             }
// //         };

// //         fetchAirQualityData();
// //     }, [lat, lng]);

// //     // Interpret API data to get AQI level, meaning, and precautions
// //     const interpretAirQuality = (data) => {
// //         if (!data || !data.list?.length) return null;
// //         const { aqi } = data.list[0].main;
// //         const { components } = data.list[0];

// //         const aqiInfo = {
// //             1: {
// //                 level: "Good",
// //                 emoji: "🌿",
// //                 color: "bg-green-500/20 border-green-400 text-green-300",
// //                 description: "The air is clean and safe to breathe.",
// //                 measures: "Enjoy the outdoors! It's a great day to be outside."
// //             },
// //             2: {
// //                 level: "Fair",
// //                 emoji: "🌤️",
// //                 color: "bg-yellow-500/20 border-yellow-400 text-yellow-300",
// //                 description: "Air quality is acceptable, but there may be slight pollution.",
// //                 measures: "Safe for most people. Sensitive groups stay aware."
// //             },
// //             3: {
// //                 level: "Moderate",
// //                 emoji: "🌫️",
// //                 color: "bg-orange-500/20 border-orange-400 text-orange-300",
// //                 description: "Moderate pollution — may affect sensitive individuals.",
// //                 measures: "Reduce prolonged outdoor activity if you have respiratory issues."
// //             },
// //             4: {
// //                 level: "Poor",
// //                 emoji: "😷",
// //                 color: "bg-red-500/20 border-red-400 text-red-300",
// //                 description: "Air quality is poor. Health effects are possible.",
// //                 measures: "Avoid long outdoor exposure. Keep windows closed."
// //             },
// //             5: {
// //                 level: "Very Poor",
// //                 emoji: "☠️",
// //                 color: "bg-purple-500/20 border-purple-400 text-purple-300",
// //                 description: "Air is heavily polluted and unsafe.",
// //                 measures: "Stay indoors. Use air purifiers. Protect yourself outdoors."
// //             }
// //         };

// //         return {
// //             aqi,
// //             ...aqiInfo[aqi],
// //             components
// //         };
// //     };

// //     const result = interpretAirQuality(airData);

// //     return (
// //         <div className="mx-auto py-10 min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white font-inter">

// //             {/* AIR QUALITY PART */}
// //             <div className=" backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
// //                 <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 tracking-wide">
// //                     🌍 Air Quality Dashboard
// //                 </h2>
// //                 {/* <p className="text-center text-sm text-gray-300 mb-6">
// //                     Location: {lat?.toFixed(2)}, {lng?.toFixed(2)}
// //                 </p> */}

// //                 {error && (
// //                     <p className="text-center text-red-400 text-lg">{error}</p>
// //                 )}

// //                 {/* {!airData && !error && (
// //                     <p className="text-center text-gray-400">Loading air quality data...</p>
// //                 )} */}

// //                 {result && (
// //                     <div>
// //                         {/* AQI Badge */}
// //                         <div
// //                             className={` mb-6 text-lg font-semibold border ${result.color} rounded-xl py-2 px-4 flex flex-col justify-center items-start w-full sm:w-auto`}
// //                         >
// //                             {result.emoji} {result.level} — AQI {result.aqi}

// //                             {/* Description */}
// //                             <p className=" text-gray-200 mb-5 text-base sm:text-lg leading-relaxed">
// //                                 {result.description}
// //                             </p>
// //                         </div>

// //                         {/* Description */}
// //                         {/* <p className="text-center text-gray-200 mb-5 text-base sm:text-lg leading-relaxed">
// //                             {result.description}
// //                         </p> */}

// //                         {/* Precaution Section */}
// //                         <div className="bg-white/10 rounded-xl border border-white/10 p-5 sm:p-6 mb-6">
// //                             <h3 className="font-semibold text-lg mb-2 text-white/90">
// //                                 🛡️ Recommended Action
// //                             </h3>
// //                             <p className="text-gray-200 text-base leading-relaxed">
// //                                 {result.measures}
// //                             </p>
// //                         </div>

// //                         {/* Pollutant Section */}
// //                         <div className="bg-white/5 rounded-xl border border-white/10 p-5 sm:p-6">
// //                             <h3 className="font-semibold text-lg mb-3 text-white/90">
// //                                 💨 Pollutant Levels (µg/m³)
// //                             </h3>

// //                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
// //                                 {Object.entries(result.components).map(([key, value]) => (
// //                                     <div
// //                                         key={key}
// //                                         className="bg-white/10 rounded-lg p-3 text-center shadow hover:bg-white/20 transition"
// //                                     >
// //                                         <div className="text-sm text-gray-300">{key.toUpperCase()}</div>
// //                                         <div className="text-lg font-semibold text-white">
// //                                             {value.toFixed(2)}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //             {/* AIR QUALITY PART END */}

// //             {/* SOIL QUALITY PART */}
// //             <div></div>
// //             {/* SOIL QUALITY PART END */}

// //         </div>
// //     );
// // };

// // export default MapsData;






// import React, { useEffect, useState } from "react";

// const MapsData = ({ lat, lng }) => {
//     // Report switcher
//     const [reportType, setReportType] = useState("air"); // "air" | "soil"

//     // Air quality state
//     const [airData, setAirData] = useState(null);
//     const [airError, setAirError] = useState(null);
//     const [airLoading, setAirLoading] = useState(false);

//     // Soil quality state
//     const [soilData, setSoilData] = useState(null);
//     const [soilError, setSoilError] = useState(null);
//     const [soilLoading, setSoilLoading] = useState(false);

//     // -----------------------
//     // Fetch Air Quality (OpenWeatherMap)
//     // -----------------------
//     useEffect(() => {
//         if (!lat || !lng || reportType !== "air") return;

//         const fetchAirQualityData = async () => {
//             try {
//                 setAirLoading(true);
//                 setAirError(null);
//                 setAirData(null);

//                 const apiKey = "b6dece846bbb74f864220bc44a524c54"; // Your API key
//                 const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${apiKey}`;

//                 const response = await fetch(url);
//                 if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//                 const data = await response.json();
//                 setAirData(data);
//             } catch (err) {
//                 console.error("Error fetching air quality data:", err);
//                 setAirError(err.message);
//             } finally {
//                 setAirLoading(false);
//             }
//         };

//         fetchAirQualityData();
//     }, [lat, lng, reportType]);

//     // -----------------------
//     // Fetch Soil Quality (Open-Meteo)
//     // -----------------------
//     useEffect(() => {
//         if (!lat || !lng || reportType !== "soil") return;

//         const fetchSoilData = async () => {
//             try {
//                 setSoilLoading(true);
//                 setSoilError(null);
//                 setSoilData(null);

//                 // Using Open-Meteo free API for soil moisture and temperature
//                 const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=soil_temperature_0cm,soil_temperature_6cm,soil_moisture_0_1cm,soil_moisture_1_3cm,soil_moisture_3_9cm&timezone=auto`;

//                 const response = await fetch(url);
//                 if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//                 const data = await response.json();
//                 setSoilData(data);
//             } catch (err) {
//                 console.error("Error fetching soil data:", err);
//                 setSoilError(err.message);
//             } finally {
//                 setSoilLoading(false);
//             }
//         };

//         fetchSoilData();
//     }, [lat, lng, reportType]);

//     // -----------------------
//     // Interpreters
//     // -----------------------
//     const interpretAirQuality = (data) => {
//         if (!data || !data.list?.length) return null;
//         const { aqi } = data.list[0].main;
//         const { components } = data.list[0];

//         const aqiInfo = {
//             1: {
//                 level: "Good",
//                 emoji: "🌿",
//                 color: "bg-green-500/20 border-green-400 text-green-300",
//                 description: "The air is clean and safe to breathe.",
//                 measures: "Enjoy the outdoors! It's a great day to be outside.",
//             },
//             2: {
//                 level: "Fair",
//                 emoji: "🌤️",
//                 color: "bg-yellow-500/20 border-yellow-400 text-yellow-300",
//                 description: "Air quality is acceptable, but there may be slight pollution.",
//                 measures: "Safe for most people. Sensitive groups stay aware.",
//             },
//             3: {
//                 level: "Moderate",
//                 emoji: "🌫️",
//                 color: "bg-orange-500/20 border-orange-400 text-orange-300",
//                 description: "Moderate pollution — may affect sensitive individuals.",
//                 measures: "Reduce prolonged outdoor activity if you have respiratory issues.",
//             },
//             4: {
//                 level: "Poor",
//                 emoji: "😷",
//                 color: "bg-red-500/20 border-red-400 text-red-300",
//                 description: "Air quality is poor. Health effects are possible.",
//                 measures: "Avoid long outdoor exposure. Keep windows closed.",
//             },
//             5: {
//                 level: "Very Poor",
//                 emoji: "☠️",
//                 color: "bg-purple-500/20 border-purple-400 text-purple-300",
//                 description: "Air is heavily polluted and unsafe.",
//                 measures: "Stay indoors. Use air purifiers. Protect yourself outdoors.",
//             },
//         };

//         return {
//             aqi,
//             ...aqiInfo[aqi],
//             components,
//         };
//     };

//     const interpretSoilQuality = (data) => {
//         if (!data || !data.hourly || !data.hourly.time?.length) return null;

//         const h = data.hourly;
//         const lastIdx = h.time.length - 1;

//         const t0 = h.soil_temperature_0cm?.[lastIdx];
//         const t6 = h.soil_temperature_6cm?.[lastIdx];
//         const m01 = h.soil_moisture_0_1cm?.[lastIdx];
//         const m13 = h.soil_moisture_1_3cm?.[lastIdx];
//         const m39 = h.soil_moisture_3_9cm?.[lastIdx];
//         const timestamp = h.time?.[lastIdx];

//         // Simple moisture interpretation (m³/m³)
//         // Rough guidance only — thresholds vary by soil type.
//         let status = {
//             level: "Moderate",
//             emoji: "🌱",
//             color: "bg-yellow-500/20 border-yellow-400 text-yellow-300",
//             description:
//                 "Soil moisture is moderate. Plants should be okay, but monitor for drying.",
//             measures: "Irrigate if plants show stress; mulching can help retain moisture.",
//         };

//         if (m01 != null) {
//             if (m01 < 0.10) {
//                 status = {
//                     level: "Very Dry",
//                     emoji: "🔥",
//                     color: "bg-red-500/20 border-red-400 text-red-300",
//                     description: "Topsoil is very dry and may stress shallow-rooted plants.",
//                     measures: "Watering recommended. Avoid heat-of-day irrigation.",
//                 };
//             } else if (m01 >= 0.10 && m01 < 0.20) {
//                 status = {
//                     level: "Dry",
//                     emoji: "☀️",
//                     color: "bg-orange-500/20 border-orange-400 text-orange-300",
//                     description:
//                         "Topsoil moisture is low. Young plants may need supplemental water.",
//                     measures: "Consider light irrigation or drip to maintain moisture.",
//                 };
//             } else if (m01 >= 0.20 && m01 < 0.35) {
//                 status = {
//                     level: "Moderate",
//                     emoji: "🌱",
//                     color: "bg-yellow-500/20 border-yellow-400 text-yellow-300",
//                     description: "Soil moisture is moderate and generally adequate.",
//                     measures: "Monitor conditions. Mulch to reduce evaporation.",
//                 };
//             } else if (m01 >= 0.35) {
//                 status = {
//                     level: "Wet",
//                     emoji: "💧",
//                     color: "bg-blue-500/20 border-blue-400 text-blue-300",
//                     description:
//                         "Soil is quite moist. Ensure proper drainage to avoid waterlogging.",
//                     measures: "Reduce irrigation. Check for pooling around roots.",
//                 };
//             }
//         }

//         return {
//             ...status,
//             timestamp,
//             values: {
//                 "Soil Temp (0 cm) °C": t0,
//                 "Soil Temp (6 cm) °C": t6,
//                 "Moisture (0–1 cm) m³/m³": m01,
//                 "Moisture (1–3 cm) m³/m³": m13,
//                 "Moisture (3–9 cm) m³/m³": m39,
//             },
//         };
//     };

//     const air = interpretAirQuality(airData);
//     const soil = interpretSoilQuality(soilData);

//     const isAir = reportType === "air";
//     const loading = isAir ? airLoading : soilLoading;
//     const error = isAir ? airError : soilError;

//     return (
//         <div className="relative mx-auto py-10 min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white font-inter">
//             {/* Top-left dropdown */}
//             <div className="px-2 sm:px-0 mb-4">
//                 <label className="block text-xs uppercase tracking-wider text-white/70 mb-1">
//                     Report Type
//                 </label>
//                 <div className="inline-flex items-center gap-2">
//                     <select
//                         value={reportType}
//                         onChange={(e) => setReportType(e.target.value)}
//                         className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//                     >
//                         <option value="air">Air Quality</option>
//                         <option value="soil">Soil Quality</option>
//                     </select>
//                     {(lat != null && lng != null) && (
//                         <span className="text-xs text-white/60">
//                             {Number(lat).toFixed(2)}, {Number(lng).toFixed(2)}
//                         </span>
//                     )}
//                 </div>
//             </div>

//             {/* Card */}
//             <div className="mx-2 sm:mx-0 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
//                 <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 tracking-wide">
//                     {isAir ? "🌍 Air Quality Dashboard" : "🌾 Soil Quality Dashboard"}
//                 </h2>

//                 {error && (
//                     <p className="text-center text-red-400 text-lg mt-4">{error}</p>
//                 )}

//                 {loading && !error && (
//                     <div className="mt-6 flex items-center justify-center gap-2 text-gray-300">
//                         <svg className="h-5 w-5 animate-spin text-indigo-400" viewBox="0 0 24 24" fill="none">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
//                         </svg>
//                         Loading {isAir ? "air" : "soil"} data...
//                     </div>
//                 )}

//                 {!loading && !error && isAir && air && (
//                     <div>
//                         {/* AQI Badge */}
//                         <div className={`mb-6 text-lg font-semibold border ${air.color} rounded-xl py-2 px-4 flex flex-col justify-center items-start w-full sm:w-auto`}>
//                             {air.emoji} {air.level} — AQI {air.aqi}
//                             <p className="text-gray-200 mb-5 text-base sm:text-lg leading-relaxed">
//                                 {air.description}
//                             </p>
//                         </div>

//                         {/* Recommended Action */}
//                         <div className="bg-white/10 rounded-xl border border-white/10 p-5 sm:p-6 mb-6">
//                             <h3 className="font-semibold text-lg mb-2 text-white/90">
//                                 🛡️ Recommended Action
//                             </h3>
//                             <p className="text-gray-200 text-base leading-relaxed">
//                                 {air.measures}
//                             </p>
//                         </div>

//                         {/* Pollutants */}
//                         <div className="bg-white/5 rounded-xl border border-white/10 p-5 sm:p-6">
//                             <h3 className="font-semibold text-lg mb-3 text-white/90">
//                                 💨 Pollutant Levels (µg/m³)
//                             </h3>

//                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                                 {Object.entries(air.components).map(([key, value]) => (
//                                     <div
//                                         key={key}
//                                         className="bg-white/10 rounded-lg p-3 text-center shadow hover:bg-white/20 transition"
//                                     >
//                                         <div className="text-sm text-gray-300">{key.toUpperCase()}</div>
//                                         <div className="text-lg font-semibold text-white">
//                                             {Number(value).toFixed(2)}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {!loading && !error && !isAir && soil && (
//                     <div>
//                         {/* Soil Status Badge */}
//                         <div className={`mb-6 text-lg font-semibold border ${soil.color} rounded-xl py-2 px-4 flex flex-col justify-center items-start w-full sm:w-auto`}>
//                             {soil.emoji} {soil.level}
//                             <p className="text-gray-200 mb-5 text-base sm:text-lg leading-relaxed">
//                                 {soil.description}
//                             </p>
//                             {soil.timestamp && (
//                                 <span className="text-xs text-white/60">
//                                     Last update: {new Date(soil.timestamp).toLocaleString()}
//                                 </span>
//                             )}
//                         </div>

//                         {/* Recommended Action */}
//                         <div className="bg-white/10 rounded-xl border border-white/10 p-5 sm:p-6 mb-6">
//                             <h3 className="font-semibold text-lg mb-2 text-white/90">
//                                 🧑‍🌾 Recommended Action
//                             </h3>
//                             <p className="text-gray-200 text-base leading-relaxed">
//                                 {soil.measures}
//                             </p>
//                         </div>

//                         {/* Soil Metrics */}
//                         <div className="bg-white/5 rounded-xl border border-white/10 p-5 sm:p-6">
//                             <h3 className="font-semibold text-lg mb-3 text-white/90">
//                                 🌡️ Soil Metrics
//                             </h3>

//                             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                                 {Object.entries(soil.values)
//                                     .filter(([, v]) => v != null)
//                                     .map(([label, value]) => (
//                                         <div
//                                             key={label}
//                                             className="bg-white/10 rounded-lg p-3 text-center shadow hover:bg-white/20 transition"
//                                         >
//                                             <div className="text-sm text-gray-300">{label}</div>
//                                             <div className="text-lg font-semibold text-white">
//                                                 {Number(value).toFixed(2)}
//                                             </div>
//                                         </div>
//                                     ))}
//                             </div>

//                             <p className="mt-3 text-xs text-white/60">
//                                 Moisture units are volumetric water content (m³/m³). Thresholds are approximate and vary by soil type.
//                             </p>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MapsData;









import React, { useEffect, useState } from "react";

const MapsData = ({ lat, lng }) => {
    // Report switcher
    const [reportType, setReportType] = useState("air"); // "air" | "soil"

    // Air quality state
    const [airData, setAirData] = useState(null);
    const [airError, setAirError] = useState(null);
    const [airLoading, setAirLoading] = useState(false);

    // Soil state (SoilGrids)
    const [soilData, setSoilData] = useState(null); // processed array of metrics
    const [soilError, setSoilError] = useState(null);
    const [soilLoading, setSoilLoading] = useState(false);

    // -----------------------
    // Fetch Air Quality (OpenWeatherMap)
    // -----------------------
    useEffect(() => {
        if (!lat || !lng || reportType !== "air") return;

        const fetchAirQualityData = async () => {
            try {
                setAirLoading(true);
                setAirError(null);
                setAirData(null);

                const apiKey = "b6dece846bbb74f864220bc44a524c54"; // Your API key
                const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${apiKey}`;

                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setAirData(data);
            } catch (err) {
                console.error("Error fetching air quality data:", err);
                setAirError(err.message);
            } finally {
                setAirLoading(false);
            }
        };

        fetchAirQualityData();
    }, [lat, lng, reportType]);

    // -----------------------
    // Fetch Soil Quality (SoilGrids)
    // -----------------------
    useEffect(() => {
        if (!lat || !lng || reportType !== "soil") return;

        const fetchSoilData = async () => {
            try {
                setSoilLoading(true);
                setSoilError(null);
                setSoilData(null);

                const latNum = Number(lat);
                const lonNum = Number(lng);
                if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
                    throw new Error("Invalid coordinates.");
                }

                const url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lonNum}&lat=${latNum}&property=clay&property=sand&property=silt&property=soc&property=phh2o&property=nitrogen&property=bdod&depth=0-5cm`;

                const response = await fetch(url);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("No soil data available for this location.");
                    }
                    throw new Error(`Server returned error: ${response.status}`);
                }

                const data = await response.json();
                const layers = data?.properties?.layers;
                if (!layers || !Array.isArray(layers)) {
                    throw new Error("Invalid data format received from server.");
                }

                const processed = extractSoilData(layers);
                setSoilData(processed);
            } catch (err) {
                console.error("Soil fetch error:", err);
                setSoilError(err.message || "Unable to fetch soil data. Please try again.");
            } finally {
                setSoilLoading(false);
            }
        };

        fetchSoilData();
    }, [lat, lng, reportType]);

    // -----------------------
    // Helpers (SoilGrids parsing)
    // -----------------------
    function extractSoilData(layers) {
        return layers
            .map((layer) => {
                const depth = layer?.depths?.[0];
                const value = depth?.values?.mean;
                if (value == null) return null;

                let displayValue = value;
                let displayUnit =
                    layer?.unit_measure?.name ||
                    layer?.unit_measure?.label ||
                    layer?.unit_measure?.unit ||
                    layer?.units ||
                    "";

                // Specific conversions
                if (layer.name === "phh2o") {
                    displayValue = value / 10; // pH is stored as pH*10
                    displayUnit = "pH";
                } else if (layer.name === "soc") {
                    displayValue = value / 10; // g/kg
                    displayUnit = "g/kg";
                } else if (layer.name === "bdod") {
                    displayValue = value / 100; // kg/dm³
                    displayUnit = "kg/dm³";
                }

                return {
                    property: formatPropertyName(layer.name),
                    name: layer.name,
                    mean: displayValue,
                    unit: displayUnit,
                };
            })
            .filter(Boolean);
    }

    function formatPropertyName(name) {
        const names = {
            clay: "Clay",
            sand: "Sand",
            silt: "Silt",
            soc: "Organic Carbon",
            phh2o: "pH (H₂O)",
            nitrogen: "Nitrogen",
            bdod: "Bulk Density",
        };
        return names[name] || name;
    }

    // -----------------------
    // Interpreters (Air)
    // -----------------------
    const interpretAirQuality = (data) => {
        if (!data || !data.list?.length) return null;
        const { aqi } = data.list[0].main;
        const { components } = data.list[0];

        const aqiInfo = {
            1: {
                level: "Good",
                emoji: "🌿",
                color: "bg-green-500/20 border-green-400 text-green-300",
                description: "The air is clean and safe to breathe.",
                measures: "Enjoy the outdoors! It's a great day to be outside.",
            },
            2: {
                level: "Fair",
                emoji: "🌤️",
                color: "bg-yellow-500/20 border-yellow-400 text-yellow-300",
                description: "Air quality is acceptable, but there may be slight pollution.",
                measures: "Safe for most people. Sensitive groups stay aware.",
            },
            3: {
                level: "Moderate",
                emoji: "🌫️",
                color: "bg-orange-500/20 border-orange-400 text-orange-300",
                description: "Moderate pollution — may affect sensitive individuals.",
                measures: "Reduce prolonged outdoor activity if you have respiratory issues.",
            },
            4: {
                level: "Poor",
                emoji: "😷",
                color: "bg-red-500/20 border-red-400 text-red-300",
                description: "Air quality is poor. Health effects are possible.",
                measures: "Avoid long outdoor exposure. Keep windows closed.",
            },
            5: {
                level: "Very Poor",
                emoji: "☠️",
                color: "bg-purple-500/20 border-purple-400 text-purple-300",
                description: "Air is heavily polluted and unsafe.",
                measures: "Stay indoors. Use air purifiers. Protect yourself outdoors.",
            },
        };

        return {
            aqi,
            ...aqiInfo[aqi],
            components,
        };
    };

    // -----------------------
    // Interpreters (Soil) — plain text (no HTML strings)
    // -----------------------
    function classifySoilTexture(sand, silt, clay) {
        if (sand >= 85) {
            return { type: "Sand", description: "Sandy soil - Very loose and grainy texture, excellent drainage but poor nutrient retention." };
        } else if (clay >= 40) {
            return { type: "Clay", description: "Clay soil - Dense and heavy texture, excellent nutrient retention but poor drainage." };
        } else if (silt >= 80) {
            return { type: "Silt", description: "Silty soil - Smooth texture, good fertility and moderate drainage." };
        } else if (sand >= 50 && clay < 20) {
            return { type: "Sandy Loam", description: "Sandy loam - Well-balanced texture with good drainage and moderate nutrient retention." };
        } else if (clay >= 27 && clay <= 40 && sand <= 45) {
            return { type: "Clay Loam", description: "Clay loam - Rich texture with excellent nutrient and water retention." };
        } else if (silt >= 40 && clay < 27) {
            return { type: "Silt Loam", description: "Silt loam - Very fertile with excellent structure for plant growth." };
        } else {
            return { type: "Loam", description: "Loamy soil - Ideal balanced texture with excellent drainage and nutrient retention." };
        }
    }

    function analyzePHText(ph) {
        const v = Number(ph).toFixed(1);
        if (ph < 4.5) return `${v} - Extremely acidic. May require significant lime application. Most crops will struggle.`;
        if (ph < 5.5) return `${v} - Strongly acidic. Suitable for acid-loving plants. Most vegetables will need pH adjustment.`;
        if (ph < 6.5) return `${v} - Slightly acidic. Good for most plants. Ideal for potatoes, berries, and many vegetables.`;
        if (ph <= 7.3) return `${v} - Neutral. Excellent! Optimal for most crops and garden plants.`;
        if (ph <= 8.0) return `${v} - Slightly alkaline. Suitable for many plants but may need amendments for acid-loving species.`;
        return `${v} - Alkaline. May limit nutrient availability. Consider sulfur amendments for sensitive crops.`;
    }

    function analyzeOrganicMatterText(soc) {
        // Following your original logic: OM% ≈ SOC * 1.724 (with SOC as given)
        const organicMatter = soc * 1.724;
        const pct = organicMatter.toFixed(1);
        if (organicMatter < 1) return `Very low (${pct}%). Soil needs significant organic matter addition through compost or manure.`;
        if (organicMatter < 3) return `Low to moderate (${pct}%). Regular compost application would be beneficial.`;
        if (organicMatter < 6) return `Good (${pct}%). Healthy organic matter content supporting soil life and fertility.`;
        return `Excellent (${pct}%). Rich in organic matter with strong biological activity.`;
        // Note: Depending on SOC units, adjust formula if needed.
    }

    function assessFertilityText(soc, ph, clay) {
        let score = 0;
        if (soc > 2) score += 3;
        else if (soc > 1) score += 2;
        else score += 1;

        if (ph >= 6 && ph <= 7.5) score += 3;
        else if (ph >= 5.5 && ph <= 8) score += 2;
        else score += 1;

        if (clay >= 20 && clay <= 40) score += 2;
        else if (clay >= 10 && clay <= 50) score += 1;

        if (score >= 7) return "High fertility — Excellent nutrient-holding capacity and availability for plant growth.";
        if (score >= 5) return "Moderate fertility — Good growing conditions with some fertilization recommended.";
        return "Lower fertility — Will benefit from regular fertilization and organic amendments.";
    }

    function analyzeWaterRetentionText(clay, sand, soc) {
        const retentionScore = clay * 0.4 + soc * 10 - sand * 0.2;
        if (retentionScore > 30) return "Excellent water retention — May need attention to drainage in wet seasons.";
        if (retentionScore > 15) return "Good water retention — Well-balanced for most crops.";
        if (retentionScore > 5) return "Moderate water retention — Regular watering needed in dry periods.";
        return "Low water retention — Requires frequent irrigation; mulching recommended.";
    }

    function assessAgriculturalSuitabilityList(texture, ph, soc, clay) {
        const recs = [];
        if (texture.type.includes("Loam")) recs.push("Ideal for most vegetables, grains, and fruits.");
        else if (texture.type === "Sand") recs.push("Best for root vegetables (carrots, potatoes), melons, and drought-tolerant crops.");
        else if (texture.type === "Clay") recs.push("Suitable for rice, wheat, and crops that tolerate heavy soils. Improve with organic matter.");

        if (ph >= 6 && ph <= 7) recs.push("pH is optimal for tomatoes, lettuce, beans, and corn.");
        else if (ph < 5.5) recs.push("Great for blueberries, cranberries, potatoes, and rhododendrons.");

        if (soc < 1) recs.push("Recommendation: Add 2–4 inches of compost annually to build soil health.");
        return recs;
    }

    // Derived
    const air = interpretAirQuality(airData);
    const isAir = reportType === "air";
    const loading = isAir ? airLoading : soilLoading;
    const error = isAir ? airError : soilError;

    // Layout uses h-full + overflow to keep within screen
    return (
        <div className="h-full overflow-y-auto py-6 px-2 sm:px-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white font-inter">
            {/* Top-left dropdown */}
            <div className="px-1 sm:px-0 mb-4">
                <label className="block text-xs uppercase tracking-wider text-white/70 mb-1">
                    Report Type
                </label>
                <div className="inline-flex items-center gap-2">
                    <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="air">Air Quality</option>
                        <option value="soil">Soil Quality</option>
                    </select>
                    {lat != null && lng != null && (
                        <span className="text-xs text-white/60">
                            {Number(lat).toFixed(2)}, {Number(lng).toFixed(2)}
                        </span>
                    )}
                </div>
            </div>

            {/* Card (kept within screen; scrolls if content grows) */}
            <div className="mx-1 sm:mx-0 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl max-h-full overflow-y-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 tracking-wide">
                    {isAir ? "🌍 Air Quality Dashboard" : "🌾 Soil Quality Dashboard"}
                </h2>

                {(!lat || !lng) && (
                    <p className="text-center text-gray-300 mt-6">
                        Select a location on the map to load {isAir ? "air" : "soil"} data.
                    </p>
                )}

                {error && (
                    <p className="text-center text-red-400 text-lg mt-4">{error}</p>
                )}

                {loading && !error && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-gray-300">
                        <svg className="h-5 w-5 animate-spin text-indigo-400" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Loading {isAir ? "air" : "soil"} data...
                    </div>
                )}

                {/* Air Report */}
                {!loading && !error && isAir && air && (
                    <div>
                        {/* AQI Badge */}
                        <div className={`mb-6 text-lg font-semibold border ${air.color} rounded-xl py-2 px-4 flex flex-col justify-center items-start w-full sm:w-auto`}>
                            {air.emoji} {air.level} — AQI {air.aqi}
                            <p className="text-gray-200 mb-5 text-base sm:text-lg leading-relaxed">
                                {air.description}
                            </p>
                        </div>

                        {/* Recommended Action */}
                        <div className="bg-white/10 rounded-xl border border-white/10 p-5 sm:p-6 mb-6">
                            <h3 className="font-semibold text-lg mb-2 text-white/90">
                                🛡️ Recommended Action
                            </h3>
                            <p className="text-gray-200 text-base leading-relaxed">
                                {air.measures}
                            </p>
                        </div>

                        {/* Pollutants */}
                        <div className="bg-white/5 rounded-xl border border-white/10 p-5 sm:p-6">
                            <h3 className="font-semibold text-lg mb-3 text-white/90">
                                💨 Pollutant Levels (µg/m³)
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {Object.entries(air.components).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="bg-white/10 rounded-lg p-3 text-center shadow hover:bg-white/20 transition"
                                    >
                                        <div className="text-sm text-gray-300">{key.toUpperCase()}</div>
                                        <div className="text-lg font-semibold text-white">
                                            {Number(value).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Soil Report (built inline; scroll-safe container already applied on card) */}
                {!loading && !error && !isAir && soilData && (
                    <div>
                        {/* Derive quick values */}
                        {(() => {
                            const getValue = (name) => soilData.find((d) => d.name === name)?.mean ?? 0;
                            const clay = getValue("clay");
                            const sand = getValue("sand");
                            const silt = getValue("silt");
                            const ph = getValue("phh2o");
                            const soc = getValue("soc");
                            const texture = classifySoilTexture(sand, silt, clay);
                            const phText = analyzePHText(ph);
                            const organicText = analyzeOrganicMatterText(soc);
                            const fertilityText = assessFertilityText(soc, ph, clay);
                            const retentionText = analyzeWaterRetentionText(clay, sand, soc);
                            const suitability = assessAgriculturalSuitabilityList(texture, ph, soc, clay);

                            return (
                                <>
                                    {/* Summary */}
                                    <div className="bg-white/10 rounded-xl border border-white/10 p-5 sm:p-6 mb-6">
                                        <h3 className="font-semibold text-lg mb-3 text-white/90">
                                            📊 Soil Analysis Summary
                                        </h3>

                                        <div className="space-y-3 text-sm sm:text-base">
                                            <p>
                                                <span className="font-semibold">Texture:</span> {texture.description}
                                            </p>
                                            <p>
                                                <span className="font-semibold">pH Level:</span> {phText}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Organic Matter:</span> {organicText}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Fertility:</span> {fertilityText}
                                            </p>
                                            <p>
                                                <span className="font-semibold">Water Retention:</span> {retentionText}
                                            </p>

                                            <div className="mt-2 p-3 sm:p-4 bg-emerald-900/20 border border-emerald-700/40 rounded-lg">
                                                <div className="font-semibold mb-1">🌱 Agricultural Suitability</div>
                                                {suitability.length ? (
                                                    <ul className="list-disc pl-5 space-y-1 text-white/90">
                                                        {suitability.map((item, idx) => (
                                                            <li key={idx}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-white/80">No specific recommendations.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Soil Metrics (0–5 cm) */}
                                    <div className="bg-white/5 rounded-xl border border-white/10 p-5 sm:p-6">
                                        <h3 className="font-semibold text-lg mb-3 text-white/90">
                                            🌡️ Soil Metrics (0–5 cm)
                                        </h3>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {soilData.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="bg-white/10 rounded-lg p-3 text-center shadow hover:bg-white/20 transition"
                                                >
                                                    <div className="text-sm text-gray-300">{item.property}</div>
                                                    <div className="text-lg font-semibold text-white">
                                                        {Number(item.mean).toFixed(2)}
                                                    </div>
                                                    <div className="text-xs text-gray-400">{item.unit}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="mt-3 text-xs text-white/60">
                                            Notes: Fractions (sand/silt/clay) are typically g/kg; pH is unitless; SOC is g/kg; BDOD is kg/dm³. Thresholds are approximate and vary by soil type.
                                        </p>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapsData;