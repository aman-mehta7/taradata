import React, { useEffect } from 'react'

const MapsData = ({ lat, lng }) => {
    useEffect(() => {
        if (!lat || !lng) return;
        const fetchAirQualityData = async () => {
            const apiKey = "b6dece846bbb74f864220bc44a524c54";
            const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${apiKey}
`
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                console.log("Air Quality Data:", data);
            } catch (error) {
                console.error("Error fetching air quality data:", error);
            }
        }
        fetchAirQualityData();

    }, [lat, lng]);
    return (
       <>
        <div>
            {/* Display lat and lng for debugging */}
            <p className='text-white'>Latitude: {lat}</p>
            <p className='text-white'>Longitude: {lng}</p>
            {/* <p className='text-white'>Fetching air quality data...</p> */}
            <p>
                {lat && lng ? "Fetching air quality data..." : "Air quality data fetched. Check console for details."}
            </p>
        </div>
       </>
    )
}

export default MapsData