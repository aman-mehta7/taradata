
import React, { useEffect, useState, useContext } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AppContext } from "../context/AppContext.jsx";
import MapsData from "./MapsData.jsx";
// Zoom limits
const ZOOM = {
    initial: 7,
    min: 5,
    max: 19,
};

// Click on map to move marker
function ClickableMap({ setMarker }) {
    useMapEvents({
        click(e) {
            setMarker(e.latlng);
            // setLocation(e.latlng);
            console.log(e.latlng)
        },
    });
    return null;
}

// Smoothly recenter the map when marker changes, clamped to min/max zoom
function FlyToMarker({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            const current = map.getZoom();
            const z = Math.max(ZOOM.min, Math.min(current, ZOOM.max));
            map.flyTo([position.lat, position.lng], z, { duration: 0.6 });
        }
    }, [position, map]);
    return null;
}

function OSMMapWithAutocomplete() {
    // 🟢 Start with no marker
    const [marker, setMarker] = useState(null);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [loadingSuggest, setLoadingSuggest] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const { setLocation } = useContext(AppContext);

    // sync context when marker changes
    useEffect(() => {
        if (marker) {
            setLocation(marker);

        } else {
            setLocation(null);
        }
    }, [marker, setLocation]);

    // Fetch suggestions (debounced)
    useEffect(() => {
        const q = query.trim();
        if (q.length < 2) {
            setSuggestions([]);
            setActiveIndex(-1);
            return;
        }

        const controller = new AbortController();
        const timer = setTimeout(async () => {
            try {
                setLoadingSuggest(true);
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        q
                    )}&limit=5&addressdetails=1`,
                    { signal: controller.signal }
                );
                const data = await response.json();
                setSuggestions(data);
                setActiveIndex(data.length ? 0 : -1);
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            } finally {
                setLoadingSuggest(false);
            }
        }, 250);

        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [query]);

    const handleSelect = (place) => {
        setSelectedPlace(place);
        setQuery(place.display_name);
        setSuggestions([]);
        setActiveIndex(-1);
    };

    const handleSearch = async () => {
        try {
            setLoadingSearch(true);

            let place = selectedPlace || suggestions[0];

            if (!place && query.trim()) {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        query.trim()
                    )}&limit=1&addressdetails=1`
                );
                const data = await res.json();
                if (data?.length) place = data[0];
            }

            if (!place) {
                alert("No results found.");
                return;
            }

            const lat = parseFloat(place.lat);
            const lng = parseFloat(place.lon);
            setMarker({ lat, lng });
            setSelectedPlace(place);
            setQuery(place.display_name || query);
            setSuggestions([]);
            setActiveIndex(-1);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingSearch(false);
        }
    };

    const handleKeyDown = (e) => {
        if (!suggestions.length) {
            if (e.key === "Enter") handleSearch();
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) {
                handleSelect(suggestions[activeIndex]);
            } else {
                handleSearch();
            }
        } else if (e.key === "Escape") {
            setSuggestions([]);
            setActiveIndex(-1);
        }
    };

    const handleUseMyLocation = async () => {
        if (!("geolocation" in navigator)) {
            alert("Geolocation is not supported in this browser.");
            return;
        }
        setLoadingSearch(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                setMarker({ lat: latitude, lng: longitude });

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await res.json();
                    if (data?.display_name) setQuery(data.display_name);
                    else setQuery("Your location");
                } catch {
                    setQuery("Your location");
                } finally {
                    setLoadingSearch(false);
                }
            },
            (err) => {
                console.error(err);
                setLoadingSearch(false);
                alert("Unable to get your location.");
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    return (
        <div className="relative w-full mx-auto p-4 md:p-6 lg:p-8 min-h-screen flex">
            <div className="bg-red-400 w-[40%] p-2 mx-2 max-w-7xl flex flex-col ">
                {/* <MapsData /> */}
                {
                    marker ? <>
                        {/* {marker.lat}, {marker.lng} */}
                        <MapsData lat={marker.lat} lng={marker.lng} />
                    </> : null
                }

            </div>



            {/* Map start */}
            <div className="relative w-[60%] max-w-7xl mx-auto flex flex-col bg-green-400 min-h-screen ">
                {/* Map Container */}
                <MapContainer
                    center={[27, 85]} // neutral fallback center
                    zoom={ZOOM.initial}
                    minZoom={ZOOM.min}
                    maxZoom={ZOOM.max}
                    className="flex-1 w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] rounded-2xl shadow-xl ring-1 ring-black/10 overflow-hidden"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        maxZoom={ZOOM.max}
                        maxNativeZoom={19}
                    />
                    <ClickableMap setMarker={setMarker} />
                    {marker && (
                        <>
                            <Marker position={marker} />
                            <FlyToMarker position={marker} />
                        </>
                    )}
                </MapContainer>

                {/* Search Panel - Overlay at top right */}
                <div className="absolute top-6 md:top-8 lg:top-10 right-6 md:right-8 lg:right-10 z-[1000] w-[calc(100%-3rem)] sm:w-96 md:w-[420px]">
                    <div className="rounded-xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg ring-1 ring-black/10 border border-gray-100/50 dark:border-neutral-800/50">
                        <div className="p-3">
                            {/* Input + suggestions */}
                            <div className="relative mb-2">
                                {/* Search icon */}
                                <svg
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>

                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setSelectedPlace(null);
                                        setActiveIndex(-1);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    onBlur={() => {
                                        setTimeout(() => setSuggestions([]), 150);
                                    }}
                                    placeholder="Search places..."
                                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/90 dark:bg-neutral-800/90 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 text-sm outline-none ring-1 ring-gray-200 dark:ring-neutral-700 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                    aria-label="Search places"
                                    aria-expanded={suggestions.length > 0 ? "true" : "false"}
                                    autoComplete="off"
                                />

                                {/* Clear button */}
                                {query && (
                                    <button
                                        onClick={() => {
                                            setQuery("");
                                            setSelectedPlace(null);
                                            setSuggestions([]);
                                            setActiveIndex(-1);
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                                        aria-label="Clear search"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7.707 7.293a1 1 0 00-1.414 1.414L8.586 11l-2.293 2.293a1 1 0 101.414 1.414L10 12.414l2.293 2.293a1 1 0 001.414-1.414L11.414 11l2.293-2.293a1 1 0 00-1.414-1.414L10 9.586 7.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                )}

                                {/* Suggestions dropdown */}
                                {suggestions.length > 0 && (
                                    <ul className="absolute top-full mt-2 w-full max-h-64 z-[100] overflow-auto rounded-lg border border-gray-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm shadow-xl">
                                        {suggestions.map((place, i) => {
                                            const isActive = i === activeIndex;
                                            return (
                                                <li
                                                    key={`${place.place_id}-${i}`}
                                                    onMouseEnter={() => setActiveIndex(i)}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        handleSelect(place);
                                                    }}
                                                    className={[
                                                        "px-3 py-2 cursor-pointer text-sm text-gray-800 dark:text-gray-100 border-b last:border-b-0 border-gray-100 dark:border-neutral-700",
                                                        isActive
                                                            ? "bg-indigo-50 dark:bg-indigo-600/20"
                                                            : "hover:bg-gray-50 dark:hover:bg-neutral-700/50",
                                                    ].join(" ")}
                                                >
                                                    {place.display_name}
                                                </li>
                                            );
                                        })}
                                        {loadingSuggest && (
                                            <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                <svg
                                                    className="h-4 w-4 animate-spin text-indigo-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    />
                                                </svg>
                                                Loading...
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </div>

                            {/* Use My Location Button */}
                            <button
                                onClick={handleUseMyLocation}
                                disabled={loadingSearch}
                                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-800/90 text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loadingSearch ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>
                                        Locating...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                            <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"></path>
                                            <path d="M12 2v2"></path>
                                            <path d="M12 20v2"></path>
                                            <path d="M20 12h2"></path>
                                            <path d="M2 12h2"></path>
                                        </svg>
                                        Use My Location
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Coordinates pill (overlay bottom-left) */}
                {marker && (
                    <div className="absolute left-6 md:left-8 lg:left-10 bottom-6 md:bottom-8 lg:bottom-10 z-[1000]">
                        <div className="rounded-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md px-3 py-2 text-xs text-gray-700 dark:text-gray-200 shadow-lg ring-1 ring-black/10 border border-gray-100/50 dark:border-neutral-800/50">
                            <div>
                                <span className="font-semibold">Lat:</span> {marker.lat.toFixed(6)}
                            </div>
                            <div>
                                <span className="font-semibold">Lng:</span> {marker.lng.toFixed(6)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Map end */}

        </div>
    );
}

export default OSMMapWithAutocomplete;