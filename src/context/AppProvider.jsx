import React, { useState } from "react";
import { AppContext } from "./AppContext";

export const AppProvider = ({ children }) => {
    const [location, setLocation] = useState(null); // null initially
    const locationAvailable = location !== null;

    return (
        <AppContext.Provider value={{ location, setLocation, locationAvailable }}>
            {children}
        </AppContext.Provider>
    );
};
